require("dotenv").config();
const app = require("../src/app");

const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("../src/services/ai.service");
const { log } = require("console");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log("conncted");

  socket.on("ai-message", async (data) => {
    console.log("text recived");
    const res = await generateResponse(data.prompt);

    socket.emit("ai-response-listener", { res });
  });

  socket.on("disconnect", () => {
    console.log("disconncted");
  });
});
httpServer.listen(3000, () => {
  console.log("server running on port 3000");
});
