import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import imageAi from './routes/imageAi.js'
import postRoutes from './routes/post.js'

import connectDB from "./mongoDB/connect.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); // para las imagenes

app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Hola Mundo'
    })
})

app.use('/api/v1/imageai', imageAi)
app.use('/api/v1/posts', postRoutes)

const startServer = () => {
    try {
        connectDB(process.env.MONGODB_URL);
        const port = 8080;
        app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`))
    } catch (error) {
        
    }
}

startServer();