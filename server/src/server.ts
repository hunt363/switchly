import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import shortUrl from "./routes/shortUrl";
dotenv.config();
connectDB();

const port=process.env.PORT||3000;
console.log(process.env.PORT);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// app.use(cors({
//     origin: "https://switchly.vercel.app",
//     credentials: true,
// }));

// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true,
// }))

app.use("/api/",shortUrl);
app.get('/', (req, res) => {
    res.send('API alive')
  })

app.listen(port, ()=>{
    console.log(`server started on port:${port}`);
}
)