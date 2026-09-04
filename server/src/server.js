import express from "express"
import "dotenv/config";
import { getMovieById } from "./services/tmdbService.js";
import cors from "cors";


const app = express()
const port = 3000
app.use(cors());

app.get("/api/movies/:id", async(req,res)=>{
    const {id} = req.params
    try{
        const data = await getMovieById(id)
        res.json(data)

    }
    catch(error){
        console.error(error)
        res.status(500).json({message:  "Failed to fetch movie"})
    }
})

app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})