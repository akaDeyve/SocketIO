var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

http.listen(3000, function () {
  console.log("listening on *:3000");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function (socket) {
  console.log("🍃a user connected");
  io.emit("user join", { for: "everyone" });
  
  socket.on("disconnect", function () {
    io.emit("user leave", { for: "everyone" });
    console.log("❌ Ein Nutzer hat den Server Verlassen");
  });
});

io.emit('some event', { for: 'everyone' });

io.on("connection", function (socket) {
  socket.on("chat message", function (msg) {
    console.log("Message: " + msg);
    io.emit("chat message", msg);
  });
});