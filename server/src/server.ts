import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import shortUrl from "./routes/shortUrl";
dotenv.config();
connectDB();

const port=process.env.PORT||5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: "https://switchly.vercel.app/"||"http://localhost:3000",
    credentials: true,
}));

app.use("/api/",shortUrl);

app.listen(port, ()=>{
    console.log(`server started on port:${port}`);
})