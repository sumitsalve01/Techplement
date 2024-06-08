import express from "express";
import dotenv from "dotenv";
import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import cors from 'cors';
import {join} from 'path';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 6060;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: "http://localhost:3000",
    methods:["GET","POST"],
}
));

app.use(cookieParser());

app.use(express.static(join(__dirname,'/frontend/build')));
app.get('*', (req,res) =>{
    res.sendFile(join(__dirname,'/frontend/build','index.html'));
});


app.use("/api/auth",authRoute);

app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
    connectMongoDB();
});