import { client, db } from ".";
import { checkStatus } from "./checkStatus";
import { sendEmail } from "./email";
import { emailTemplate } from "./emailTemplate";

export async function getLatestStatus() {
    try {
        let currentTime;
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
                const latestTime = new Date(latestStatus.lastChecked).getTime();
                currentTime = new Date().getTime();

                const fiveMinutesInMs = 5 * 60 * 1000;
                if (currentTime - latestTime < fiveMinutesInMs && latestStatus.status === statusObject.status) {
                    console.log(`Status for ${url} already recorded in the last 5 minutes.`);
                    continue;
                }
            }

            await client.rPush(redisKey, JSON.stringify(statusObject));
            await client.lTrim(redisKey, -50, -1);

            if (latestEntry) {
                const latestStatus = JSON.parse(latestEntry);
                if (latestStatus.status !== statusObject.status) {
                    console.log(`Status for ${url} has changed. Sending email to ${ws.email}`);
                    const subject = `Status for ${url} has changed to ${statusObject.status}`;
                    const html = emailTemplate({
                        websiteUrl: ws.url,
                        statusMessage: statusObject.status,
                        timeDetected: statusObject.lastChecked,
                        responseCode: statusObject.code,
                        responseTime: statusObject.responseTime,
                        dashboardUrl: "",
                        unsubscribeUrl: ""
                    });
                    const mail = await sendEmail(ws.email, subject, html);
                    // @ts-ignore
                    if (mail) {
                        console.log(`Email sent to ${ws.email}`);
                    } else {
                        console.log(`Failed to send email to ${ws.email}`);
                    }
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