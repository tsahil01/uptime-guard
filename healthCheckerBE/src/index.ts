import express from 'express';
import cors from 'cors';
import axios from 'axios';
import z from 'zod';
import { createClient } from "redis";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const urlSchema = z.string().url();
const urlsSchema = z.array(urlSchema);

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await client.connect();
    console.log('Connected to Redis');
})();

async function checkStatus({ url }: { url: string }) {
    try {
        const response = await axios.get(url);
        return { url, status: 'UP', code: response.status };
    } catch (error: any) {
        return { url, status: 'DOWN', code: error.response?.status || "N/A" };
    }
}

app.post('/health', async (req, res) => {
    const data = req.body;
    try {
        const urls = data.urls;
        urlsSchema.parse(urls);

        const results = await Promise.all(
            urls.map(async (url: string) => {

                const cachedResult = await client.get(url);
                if (cachedResult) {
                    return JSON.parse(cachedResult);
                }

                await client.set(url, JSON.stringify({ url, status: 'processing' }), { EX: 60 }); // 60 seconds

                const result = await checkStatus({ url });
                await client.set(url, JSON.stringify(result), { EX: 60 }); // 60 seconds
                return result;

            })
        );

        res.json({
            status: 'success',
            data: results
        });

    } catch (error: z.ZodError | any) {
        res.status(400).json({
            status: 'error',
            message: error.errors || error.message || error
        });
    }
});

app.post('/health/single', async (req, res) => {
    const data = req.body;
    try {
        const url = data.url;
        urlSchema.parse(url);

        const isCached = await client.get(url);
        if (isCached) {
            res.json({
                status: 'success',
                data: JSON.parse(isCached)
            });
            return;
        }
        
        const result = await checkStatus({ url });
        await client.set(url, JSON.stringify(result), { EX: 60 }); // 60 seconds

        res.json({
            status: 'success',
            data: result
        });

    } catch (error: z.ZodError | any) {
        res.status(400).json({
            status: 'error',
            message: error.errors || error.message || error
        });
    }
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));