# Socket.IO Bare Bone Setup

A minimal real-time chat application built to explore the fundamentals of [Socket.IO](https://socket.io/). No frameworks, no abstractions, just the bare essentials to understand how WebSocket communication works between a server and multiple browser clients.

---

## What It Does

- Serves a simple HTML chat UI via Express
- Establishes a persistent WebSocket connection between each browser tab and the server
- Broadcasts chat messages to **all connected clients** in real time
- Notifies all clients when a user **joins** or **leaves**

---

## Tech Stack

| Layer    | Technology              |
|----------|-------------------------|
| Server   | Node.js + Express 5     |
| Realtime | Socket.IO 4             |
| Client   | Vanilla HTML/CSS/JS     |

---

## Project Structure

```
SocketIO/
├── index.html      # Chat UI + client-side Socket.IO logic
├── script.js       # Node.js server (Express + Socket.IO)
├── style.css       # Basic styling
└── package.json    # Dependencies
```

---

### Install & Run

```bash
# 1. Clone the repository
git clone https://github.com/akaDeyve/SocketIO.git
cd SocketIO

# 2. Install dependencies
npm install

# 3. Start the server
node script.js
```

The server starts on **http://localhost:3000**

Open the URL in **multiple browser tabs** to see real-time communication in action.

---

## How It Works

### Server (`script.js`)

The server wires up Express and Socket.IO on top of a plain Node.js HTTP server:

```js
var app  = require("express")();
var http = require("http").Server(app);
var io   = require("socket.io")(http);
```

**Key events handled on the server:**

| Event            | Direction         | Description                          |
|------------------|-------------------|--------------------------------------|
| `connection`     | client → server   | Fired when a client connects         |
| `disconnect`     | client → server   | Fired when a client closes the tab   |
| `chat message`   | client → server   | Receives a message from one client   |
| `user join`      | server → all      | Broadcast when a new user connects   |
| `user leave`     | server → all      | Broadcast when a user disconnects    |
| `chat message`   | server → all      | Rebroadcasts a message to everyone   |

### Client (`index.html`)

The client connects automatically via the Socket.IO client library served by the server itself (`/socket.io/socket.io.min.js`). It listens for incoming events and updates the DOM, and emits a `chat message` event on form submit.

---

## Key Concepts Demonstrated

- **`io.emit(event, data)`**  broadcast to **all** connected clients
- **`socket.emit(event, data)`**  send to **one specific** client
- **`socket.on("disconnect")`**  detect when a client drops the connection
- Client and server share the same named events (`"chat message"`, `"user join"`, etc.)  this is the Socket.IO contract

---

## Notes
- This project intentionally keeps everything minimal, it is a learning reference, not a production setup.
