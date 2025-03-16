import express from "express";
import { authMiddleware } from "./authMiddleware";
import prisma from "db/client";

const app = express();
app.use(express.json());

app.use(authMiddleware);

app.post('api/v1/addsite', async(req, res) => { 
    const userId = req.userId!;
    const url = req.body.url;
    const website = await prisma.website.create({
        data: {
            url,
            userId,
            tickId: Math.random().toString()
        }
    });
    res.json(website);
});

app.get('api/v1/getsites', async(req, res) => { 
    const userId = req.userId!;
    const websites = await prisma.website.findMany({
        where: {
            userId
        }
    });
    res.json(websites);
});

app.delete('api/v1/deletesite', async(req, res) => { 
    const userId = req.userId!;
    const url = req.body.url;
    const website = await prisma.website.delete({
        where: {
            url,
            userId
        }
    });
    res.json(website);
});

app.listen(3000, () => console.log("Listening on port 3000"));