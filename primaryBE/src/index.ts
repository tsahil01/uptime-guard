import express from 'express';
import cors from 'cors';
import router from './routes';
import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import cron from 'node-cron';
import { checkDbWithRedis, getLatestStatus } from './cronJobs';

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

// run cron jobs
cron.schedule('*/61 * * * * *', async () => {
    console.log('running a task every 61 seconds');
    await getLatestStatus();
})

cron.schedule('*/5 * * * *', async () => {
    console.log('running a task every 5 minutes');
    await checkDbWithRedis();
})


app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
