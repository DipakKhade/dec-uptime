import express from "express";
import { authMiddleware } from "./authMiddleware";
import prisma from "db/client";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.use(authMiddleware);

app.post('/api/v1/addsite', async(req, res) => { 
    try{
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
    }catch(e){
        console.log(e);
        res.status(500).json({message: "Internal Server Error"});
    }
});

app.get('/api/v1/getsites', async(req, res) => { 
    const userId = req.userId!;
    const websites = await prisma.website.findMany({
        where: {
            userId
        }
    });
    res.json(websites);
});

app.delete('/api/v1/deletesite', async(req, res) => { 
    try{
        const userId = req.userId!;
    const websiteId = req.body.id;
    const website = await prisma.website.delete({
        where: {
            id:websiteId,
            userId
        }
    });
    res.json({
        message: "Website deleted successfully"
    });
    }catch(e){
        res.status(500).json({error:e});
    }
});

app.listen(3001, () => console.log("Listening on port 3001"));