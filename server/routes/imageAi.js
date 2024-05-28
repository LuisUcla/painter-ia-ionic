import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await openai.images.generate({
            prompt,
            n: 4,
            size: '1024x1024',
            response_format: 'b64_json'
        })

        const images = aiResponse.data.data.map(e => {
            return ( 'data:image/jpeg;base64,' + e.b64_json)
        })

        res.status(200).json({ images })
    } catch (error) {
        console.log(error);
        res.status(500).send( error?.response.data.error.message || 'Algo ha salido mal, intenta de nuevo...');
    }
})

export default router;