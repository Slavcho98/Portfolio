import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Send, Trash2 } from "lucide-react";

const SOCKET_URL =
  import.meta.env.VITE_CHAT_SERVER_URL || "http://localhost:3001";

interface Message {
  id: string;
  sender: "visitor" | "admin";
  text: string;
  timestamp: string;
}

interface Conversation {
  visitorId: string;
  lastMessage: string;
  messageCount: number;
}

const AdminChat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedVisitor, setSelectedVisitor] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("admin:join");
    });

    socket.on("admin:conversations", (list: Conversation[]) => {
      setConversations(list);
    });

    socket.on("chat:history", (history: Message[]) => {
      setMessages(history);
    });

    socket.on(
      "chat:message",
      ({ visitorId, message }: { visitorId: string; message: Message }) => {
        // Update conversation list
        setConversations((prev) => {
          const existing = prev.find((c) => c.visitorId === visitorId);
          if (existing) {
            return prev.map((c) =>
              c.visitorId === visitorId
                ? {
                    ...c,
                    lastMessage: message.text,
                    messageCount: c.messageCount + 1,
                  }
                : c,
            );
          }
          return [
            ...prev,
            { visitorId, lastMessage: message.text, messageCount: 1 },
          ];
        });

        // If this conversation is selected, add message
        setSelectedVisitor((current) => {
          if (current === visitorId) {
            setMessages((prev) => {
              if (prev.find((m) => m.id === message.id)) return prev;
              return [...prev, message];
            });
          }
          return current;
        });
      },
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectConversation = (visitorId: string) => {
    setSelectedVisitor(visitorId);
    socketRef.current?.emit("admin:select", visitorId);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !socketRef.current || !selectedVisitor) return;

    socketRef.current.emit("admin:message", {
      visitorId: selectedVisitor,
      text: input.trim(),
    });
    setInput("");
  };

  const deleteConversation = (visitorId: string) => {
    socketRef.current?.emit("admin:delete", visitorId);
    if (selectedVisitor === visitorId) {
      setSelectedVisitor(null);
      setMessages([]);
    }
  };

  const clearAll = () => {
    socketRef.current?.emit("admin:clear-all");
    setSelectedVisitor(null);
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar — Conversations */}
      <div className="w-80 border-r border-border/50 flex flex-col">
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Admin Chat</h1>
            <p className="text-xs text-muted-foreground mt-1">
              {conversations.length} conversation
              {conversations.length !== 1 ? "s" : ""}
            </p>
          </div>
          {conversations.length > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 && (
            <p className="text-sm text-muted-foreground text-center mt-10">
              No conversations yet.
            </p>
          )}
          {conversations.map((c) => (
            <div
              key={c.visitorId}
              className={`flex items-center border-b border-border/30 hover:bg-secondary/30 transition-colors ${
                selectedVisitor === c.visitorId ? "bg-secondary/50" : ""
              }`}
            >
              <button
                onClick={() => selectConversation(c.visitorId)}
                className="flex-1 text-left px-4 py-3"
              >
                <p className="text-sm font-medium truncate">{c.visitorId}</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {c.lastMessage || "No messages"}
                </p>
              </button>
              <button
                onClick={() => deleteConversation(c.visitorId)}
                className="px-3 text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {!selectedVisitor ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a conversation to start replying.
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-border/50">
              <p className="text-sm font-semibold">{selectedVisitor}</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[60%] px-3 py-2 rounded-2xl text-sm ${
                      msg.sender === "admin"
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

            <form
              onSubmit={sendMessage}
              className="p-4 border-t border-border/50"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Reply..."
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
          </>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
