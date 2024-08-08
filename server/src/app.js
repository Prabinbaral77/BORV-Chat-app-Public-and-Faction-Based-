import express from "express";
import {Server} from "socket.io"
import http from "http"
import setupSocket from "./services/socket.service.js";
import MongoDBClient from './databases/mongo.js';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';


const app = express();
app.use(cors());
const server  = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST'],
        credentials: true
    }
});

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Chat app")
})
app.use("/api/chatInfo", messageRoutes)

// Connect to MongoDB
MongoDBClient.connectToDatabase();

// Setup Socket.io
setupSocket(io);


server.listen(PORT, () => {
    console.log("Server listenning on port 3000");
})