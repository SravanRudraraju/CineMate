import express from "express";
import pool from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/",authMiddleware, async(req,res)=>{
    try{
        const userId = req.userId
        const result = await pool.query(`SELECT d.id, d.watched_on, d.review, d.rating, d.liked, m.tmdb_movie_id, m.title, m.poster_path, m.release_date FROM diary_entries d JOIN movies m ON d.tmdb_movie_id = m.tmdb_movie_id WHERE d.user_id = $1 ORDER BY d.watched_on DESC`,[userId])

        res.status(200).json({
            diary : result.rows
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            message : "failed to fetch diary"
        })
    }
})

export default router