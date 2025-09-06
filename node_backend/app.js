import dotenv from "dotenv";
dotenv.config({override: true});


import express from "express"
import {createServer} from "http"
import router from "./routes/upload.route.js"
import cors from "cors"

const app= express()
const server= createServer(app)

// console.log(process.env.GEMINI_API_KEY)

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use("/", router)


server.listen(process.env.PORT || 4000 , ()=>{
    console.log(`Server runs Successfully on Port:${process.env.PORT}`)
})