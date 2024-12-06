import { client, db } from ".";
import { checkStatus } from "./checkStatus";

export async function getLatestStatus() {
    try {
        const websites = await client.lRange('websites', 0, -1);
        for (let i = 0; i < websites.length; i++) {
            const ws = JSON.parse(websites[i]);
            console.log("ws: ", ws);
            const url = ws.url;
            const wsStatus = await checkStatus({ url });

            if (wsStatus.data.status != 'UP'){
                console.log(`${url} is down. sending email to ${ws.email} `);
                // TODO: send email
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