import express from 'express';
import { z } from 'zod';
import { db, jwtsecret } from '../../index';
import jwt from 'jsonwebtoken';
import { checkStatus } from '../../checkStatus';

const websiteRoute = express.Router();

const zodWebsiteSchema = {
    url: z.string(),
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

        const website = await db.websites.create({
            data: {
                url: url,
                userId: `${decodedToken.userId}`,
            },
        });

        res.json({
            website,
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

        res.json({
            userId: decodedToken.userId,
            websites,
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

// add auth middleware
websiteRoute.get('/check', async(req, res) => {
    try {
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