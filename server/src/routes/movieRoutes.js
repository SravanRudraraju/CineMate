import express from "express";
import pool from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id/watchlist", authMiddleware , async (req,res)=>{
    try{
        const userId = req.userId
        const movieId = req.params.id

        const result = await pool.query(`INSERT INTO watchlist (user_id, tmdb_movie_id) VALUES ($1,$2) ON CONFLICT (user_id, tmdb_movie_id) DO NOTHING RETURNING * `,[userId,movieId])

        if(result.rows.length ===0){
            return res.status(200).json({
                message : "Movie is already in watchlist"
            })
        }
        res.status(201).json({
            message : "Movie added to watchlist",
            watchlist : result.rows[0]
        })

    }catch(error){
        console.log(error);
        
        res.status(500).json({
            message : "Failed to add movie to watchlist"
        })

    }
})

export default router