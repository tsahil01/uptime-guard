import { client, db } from ".";
import { checkStatus } from "./checkStatus";

export async function getLatestStatus() {
    try {
        const websites = await client.lRange('websites', 0, -1);

        for (let i = 0; i < websites.length; i++) {
            const ws = JSON.parse(websites[i]);
            const url = ws.url;

            const wsStatus = await checkStatus({ url });

            const statusObject = {
                url,
                status: wsStatus.data.status,
                code: wsStatus.data.code,
                responseTime: wsStatus.data.responseTime,
                lastChecked: wsStatus.data.lastChecked
            };

            const redisKey = `status:${url}`;

            const latestEntry = await client.lIndex(redisKey, -1);

            if (latestEntry) {
                const latestStatus = JSON.parse(latestEntry);
                const latestHour = new Date(latestStatus.lastChecked).getHours();
                const currentHour = new Date().getHours();

                if (latestHour === currentHour && latestStatus.status === statusObject.status) {
                    console.log(`Status for ${url} already recorded for this hour.`);
                    continue;
                }
            }
            await client.rPush(redisKey, JSON.stringify(statusObject));
            await client.lTrim(redisKey, -24, -1);

            if (latestEntry) {
                const latestStatus = JSON.parse(latestEntry);
                if (latestStatus.status !== statusObject.status) {
                    console.log(`Status for ${url} has changed. Sending email to ${ws.email}`);
                    // send email here
                }
            }

        }
    } catch (error: any) {
        console.log('Failed to get latest status', error);
    }
}



export async function checkDbWithRedis() {
    try {
        const dbWebsites = await db.websites.findMany({ include: { user: true } });
        await client.del('websites');
        for (let i = 0; i < dbWebsites.length; i++) {
            const website = {
                url: dbWebsites[i].url,
                email: dbWebsites[i].user.email,
            }
            await client.rPush('websites', JSON.stringify(website));
        }

        console.log('db and redis in sync');
    } catch (error: any) {
        console.log('db and redis not in sync', error);
    }
}