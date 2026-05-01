import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SOCKET_URL =
  import.meta.env.VITE_CHAT_SERVER_URL || "http://localhost:3001";

interface Message {
  id: string;
  sender: "visitor" | "admin";
  text: string;
  timestamp: string;
}

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState(0);
  const [visitorId] = useState(() => {
    const stored = sessionStorage.getItem("chat-visitor-id");
    if (stored) return stored;
    const id = `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem("chat-visitor-id", id);
    return id;
  });

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("visitor:join", visitorId);
    });

    socket.on("chat:history", (history: Message[]) => {
      setMessages(history);
    });

    socket.on(
      "chat:message",
      ({ message }: { visitorId: string; message: Message }) => {
        setMessages((prev) => {
          if (prev.find((m) => m.id === message.id)) return prev;
          return [...prev, message];
        });
        // Show unread badge if chat is closed and message is from admin
        if (message.sender === "admin") {
          setIsOpen((open) => {
            if (!open) setUnread((n) => n + 1);
            return open;
          });
        }
      },
    );

    return () => {
      socket.disconnect();
    };
  }, [visitorId]);

  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setUnread(0);
    };
    window.addEventListener("open-chat", handleOpenChat);
    return () => window.removeEventListener("open-chat", handleOpenChat);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !socketRef.current) return;

    socketRef.current.emit("visitor:message", {
      visitorId,
      text: input.trim(),
    });
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => {
              setIsOpen(true);
              setUnread(0);
            }}
            className="fixed bottom-6 right-6 z-50 size-14 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="size-6 text-white" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unread}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 inset-x-0 mx-auto md:inset-x-auto md:right-6 md:bottom-6 z-50 w-[calc(100%-2rem)] md:w-[360px] h-[500px] glass rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-border/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-semibold text-sm">Live Chat</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-foreground text-muted-foreground transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <p className="text-center text-sm text-muted-foreground mt-8">
                  Hi! Send a message and I'll get back to you shortly.
                </p>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "visitor" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                      msg.sender === "visitor"
                        ? "bg-gradient-primary text-white rounded-br-sm"
                        : "bg-secondary/70 text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={sendMessage}
              className="p-3 border-t border-border/50"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-secondary/50 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary-glow placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="size-9 rounded-full bg-gradient-primary flex items-center justify-center disabled:opacity-50 transition-opacity"
                >
                  <Send className="size-4 text-white" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
