import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => res.send("Chat server running"));
app.get("/healthz", (req, res) => res.send("ok"));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:8080",
      "https://portfolio-ecru-ten-20.vercel.app",
    ],
    methods: ["GET", "POST"],
  },
});

// Store active conversations: { visitorId: { messages: [], socketId } }
const conversations = new Map();

io.on("connection", (socket) => {
  console.log(`Connected: ${socket.id}`);

  // Visitor joins
  socket.on("visitor:join", (visitorId) => {
    socket.join(visitorId);
    socket.data.visitorId = visitorId;
    socket.data.role = "visitor";

    if (!conversations.has(visitorId)) {
      conversations.set(visitorId, { messages: [], socketId: socket.id });
    }

    // Send message history back to visitor
    const convo = conversations.get(visitorId);
    socket.emit("chat:history", convo.messages);

    // Notify admin of active conversations
    io.to("admin-room").emit("admin:conversations", getConversationList());
  });

  // Admin joins
  socket.on("admin:join", () => {
    socket.join("admin-room");
    socket.data.role = "admin";
    socket.emit("admin:conversations", getConversationList());
  });

  // Admin selects a conversation
  socket.on("admin:select", (visitorId) => {
    const convo = conversations.get(visitorId);
    if (convo) {
      socket.emit("chat:history", convo.messages);
    }
  });

  // Visitor sends a message
  socket.on("visitor:message", ({ visitorId, text }) => {
    if (!text || !text.trim()) return;

    const message = {
      id: Date.now().toString(),
      sender: "visitor",
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    const convo = conversations.get(visitorId);
    if (convo) {
      convo.messages.push(message);
    }

    // Send to admin
    io.to("admin-room").emit("chat:message", { visitorId, message });
    // Echo back to visitor
    io.to(visitorId).emit("chat:message", { visitorId, message });
  });

  // Admin sends a reply
  socket.on("admin:message", ({ visitorId, text }) => {
    if (!text || !text.trim()) return;

    const message = {
      id: Date.now().toString(),
      sender: "admin",
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    const convo = conversations.get(visitorId);
    if (convo) {
      convo.messages.push(message);
    }

    // Send to visitor room
    io.to(visitorId).emit("chat:message", { visitorId, message });
    // Echo back to admin
    io.to("admin-room").emit("chat:message", { visitorId, message });
  });

  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.id}`);
    if (socket.data.role === "visitor" && socket.data.visitorId) {
      io.to("admin-room").emit("admin:conversations", getConversationList());
    }
  });

  // Admin deletes a conversation
  socket.on("admin:delete", (visitorId) => {
    conversations.delete(visitorId);
    io.to("admin-room").emit("admin:conversations", getConversationList());
  });

  // Admin clears all conversations
  socket.on("admin:clear-all", () => {
    conversations.clear();
    io.to("admin-room").emit("admin:conversations", []);
  });
});

function getConversationList() {
  const list = [];
  for (const [visitorId, convo] of conversations) {
    const lastMsg = convo.messages[convo.messages.length - 1];
    list.push({
      visitorId,
      lastMessage: lastMsg ? lastMsg.text : "",
      messageCount: convo.messages.length,
    });
  }
  return list;
}

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Chat server running on port ${PORT}`);

  // Self-ping every 14 minutes to prevent Render free tier from sleeping
  if (process.env.RENDER_EXTERNAL_URL) {
    setInterval(
      () => {
        fetch(`${process.env.RENDER_EXTERNAL_URL}/healthz`).catch(() => {});
      },
      14 * 60 * 1000,
    );
  }
});
