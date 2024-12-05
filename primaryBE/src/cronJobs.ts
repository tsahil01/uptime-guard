import { client, db } from ".";
import { checkStatus } from "./checkStatus";

// 2 crone jobs are required - 

// 1. to check redis array of urls and check their status. 
// If status is down, send an email to the user - every 60 seconds
export async function getLatestStatus() {
    try {
        const websites = await client.lRange('websites', 0, -1);
        for (let i = 0; i < websites.length; i++) {
            const url = websites[i];
            const wsStatus = await checkStatus({ url });
            
            if (wsStatus.data.status != 'UP') 
                console.log(`${url} is down`);
                // TODO: send email
        }
    } catch (error: any) {
        console.log('Failed to get latest status', error);
    }
}

// 2. to check if db data is in sync with redis data - every 5 minutes  
export async function checkDbWithRedis() {
    try {
        const dbWebsites = await db.websites.findMany();
        await client.del('websites');
        for (let i = 0; i < dbWebsites.length; i++) {
            await client.rPush('websites', dbWebsites[i].url);
        }

        console.log('db and redis in sync');
    } catch (error: any) {
        console.log('db and redis not in sync', error);
    }
}