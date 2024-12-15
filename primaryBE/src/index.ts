import express from 'express';
import cors from 'cors';
import router from './routes';
import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import cron from 'node-cron';
import { checkDbWithRedis, getLatestStatus } from './cronJobs';
require('dotenv').config();

const app = express();
const port = 4000;
export const db = new PrismaClient();
export const jwtsecret = 'secret';

export const smtpHost = process.env.SMTP_HOST || "";
export const smtpPassword = process.env.SMTP_PASS || "";

export const client = createClient({
    url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`
});
client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await client.connect();
    console.log('Connected to Redis');
})();

app.use(express.json());
app.use(cors())

// add all routes
app.use('/api', router)

// run cron jobs
cron.schedule('*/60 * * * * *', async () => {
    console.log('running a task every 60 seconds');
    await getLatestStatus();
})

cron.schedule('*/5 * * * *', async () => {
    console.log('running a task every 5 minutes');
    await checkDbWithRedis();
})


app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
