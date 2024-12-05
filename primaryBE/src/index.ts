import express from 'express';
import cors from 'cors';
import router from './routes';
import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';

const app = express();
const port = 4000;
export const db = new PrismaClient();
export const jwtsecret = 'secret';

export const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await client.connect();
    console.log('Connected to Redis');
})();

app.use(express.json());
app.use(cors())

// add all routes
app.use('/api', router)


app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
