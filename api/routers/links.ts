import express from "express";
import {ILinkWihtoutId} from "../types";
import Link from "../models/Link";

const linksRouter = express.Router();

const generateShortUrl = () => {
    let result = '';
    for (let i = 0; i < 6; i++) {
        const isUpperCase = Math.random() < 0.5;
        const baseCharCode = isUpperCase ? 65 : 97;
        const offset = Math.floor(Math.random() * 26);
        result += String.fromCharCode(baseCharCode + offset);
    }
    return result;
};

linksRouter.post('/', async (req, res) => {
    if (!req.body.originalUrl) {
        res.status(400).send({error: "Please provide an Url!"});
        return;
    }
    const shortUrl = generateShortUrl();
    const newLink: ILinkWihtoutId = {
        originalUrl: req.body.originalUrl,
        shortUrl: shortUrl,
    };
    const link = new Link(newLink);
    try {
        const savedLink = await link.save();
        res.status(201).send(savedLink);
    } catch (error) {
        res.status(400).send(error);
        return
    }
});

linksRouter.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    try {
        const link = await Link.findOne({shortUrl});
        if (!link) {
            res.status(404).send({ error: "Short URL not found!" });
            return;
        }
        res.status(301).redirect(link.originalUrl);
    } catch (error) {
        res.status(500).send({ error: "Server error!" });
    }
});

export default linksRouter;