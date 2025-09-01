require("dotenv").config();
const app = require("./src/app");

const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("./src/services/ai.service");
const httpServer = createServer(app);
const chatHistory = [];
const io = new Server(httpServer, {
  cors:{
    origin:"http://localhost:5173"
  }
});

io.on("connection", (socket) => {
  console.log("conncted");

  socket.on("ai-message", async (data) => {
    console.log("text recived",data);
    chatHistory.push({
      role: "user",
      parts: [
        {
          text: data.input,
        },
      ],
    });
    const res = await generateResponse(chatHistory);

    socket.emit("ai-response-listener", { answer: res });
    chatHistory.push({
      role: "model",
      parts: [
        {
          text: res,
        },
      ],
    });
  });

  socket.on("disconnect", () => {
    console.log("disconncted");
    console.log(chatHistory);
  });
});
httpServer.listen(3000, () => {
  console.log("server running on port 3000");
});
