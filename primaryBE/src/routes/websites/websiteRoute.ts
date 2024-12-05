import express from 'express';
import { z } from 'zod';
import { client, db, jwtsecret } from '../../index';
import jwt from 'jsonwebtoken';
import { checkStatus } from '../../checkStatus';

const websiteRoute = express.Router();

const zodWebsiteSchema = {
    url: z.string().url(),
};

websiteRoute.post('/create', async (req, res) => {
    try {
        const { url } = z.object(zodWebsiteSchema).parse(req.body);
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const decodedToken = jwt.verify(token, jwtsecret) as jwt.JwtPayload & { userId: number };
        console.log(decodedToken);

        const website = await db.websites.upsert({
            where: {
                id: `${decodedToken.userId}-${url}`,
            },
            create: {
                id: `${decodedToken.userId}-${url}`,
                url: url,
                userId: `${decodedToken.userId}`,
            },
            update: {
                url: url,
            },
        });
        const exists = await client.lRange('websites', 0, -1);
        if (! exists.includes(url)) {
            await client.rPush('websites', url)
        }

        const wsStatus = await checkStatus({ url });

        res.json({
            db: website,
            wsStatus,
            msg: 'Website created successfully',

        });
    } catch (error: any) {
        res.json({
            message: 'Website creation failed',
            error: error,
        });
    }
});

websiteRoute.get('/userAll', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const decodedToken = jwt.verify(token, jwtsecret) as jwt.JwtPayload & { userId: number };
        console.log(decodedToken);

        const websites = await db.websites.findMany({
            where: {
                userId: `${decodedToken.userId}`,
            },
        });

        // we can do this, but it will be a lot of requests
        // so we can give a button in the frontend to check all websites
        // let wsStatus = [];
        // for (let i = 0; i < websites.length; i++) {
        //     wsStatus.push(await checkStatus({ url: websites[i].url }));
        // }

        res.json({
            userId: decodedToken.userId,
            websites,
            // wsStatus,
        });
    } catch (error: any) {
        res.json({
            message: 'Failed to fetch websites',
            error: error,
        });
    }
});

websiteRoute.get('/all', async (req, res) => {
    try {
        const websites = await db.websites.findMany();
        res.json({
            websites,
        });
    } catch (error: any) {
        res.json({
            message: 'Failed to fetch websites',
            error: error,
        });
    }
});

websiteRoute.get('/check', async(req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const decodedToken = jwt.verify(token, jwtsecret) as jwt.JwtPayload & { userId: number };
        if(!decodedToken) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const { url } = z.object(zodWebsiteSchema).parse(req.body);
        const data = await checkStatus({ url });
        res.json(data);
    } catch (error: any) {
        res.json({
            message: 'Failed to check website',
            error: error,
        });
    }
})

export default websiteRoute;

