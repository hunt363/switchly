import express from "express";
import { urlModel } from "../models/shortUrl";

export const createUrl = async (req: express.Request, res: express.Response) => {
    try {
        console.log("Full url=", req.body.fullUrl);
        const { fullUrl } = req.body;
        const urlFound = await urlModel.find({ fullUrl });
        if (urlFound.length > 0) {
            res.status(409).send(urlFound);
            return;
        }
        const shortUrl = await urlModel.create({ fullUrl });
        res.status(201).send(shortUrl);
    } catch (error) {
        res.status(500).send({ message: "something went wrong" });
    }
};
export const getAllUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrls = await urlModel.find().sort({createdAt: -1});
        if (shortUrls.length < 0) {
            res.status(404).send({ message: "not found" });
            return;
        }
        res.status(200).send(shortUrls);
    } catch (error) {
        res.status(500).send({ message: "something went wrong" });
    }
};
export const getUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
        if (!shortUrl) { res.status(404).send({ message: "not found" }); return; }
        shortUrl.clicks++;
        shortUrl.save();
        res.redirect(`${shortUrl.fullUrl}`);
    }catch(error){
        res.status(500).send({ message: "something went wrong" });
    }
};
export const deleteUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrl = await urlModel.findByIdAndDelete({ _id: req.params.id });
        if (shortUrl) { res.status(200).send({ message: "deleted successfully" });}
        else res.status(404).send({message:"not found"});
    }catch(error){
        res.status(500).send({ message: "something went wrong" });
    }
};