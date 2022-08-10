const express = require('express')
const app = express()
const http = require('http')
const { Server } = require("socket.io")
const cors = require('cors')

const serve = http.createServer(app)
app.use(cors())

const io = new Server(serve, {
    cors: {
        origin: 'http://localhost:3000/',
        method: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
})

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on("send_message", (data) => {
        console.log(data)
        socket.broadcast.emit("receive_message", data)
    })
})

serve.listen(3001, () => {
    console.log("listening on port 3001")
})