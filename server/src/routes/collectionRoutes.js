import express from "express";
import pool from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { getMovieById } from "../services/tmdbService.js";

const router = express.Router();

router.get("/watched",authMiddleware, async(req,res)=>{
    try{
        const userId = req.userId
        const result = await pool.query(`SELECT m.poster_path, m.tmdb_movie_id, m.title, m.release_date, l.tmdb_movie_id IS NOT NULL AS liked, r.rating  FROM watched_movies w JOIN movies m ON w.tmdb_movie_id = m.tmdb_movie_id   LEFT JOIN liked_movies l ON l.user_id = w.user_id AND l.tmdb_movie_id = m.tmdb_movie_id LEFT JOIN ratings r ON r.user_id = w.user_id AND r.tmdb_movie_id = w.tmdb_movie_id  WHERE w.user_id = $1`,[userId])

        res.status(200).json({
            watched_movies : result.rows
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            message: "failed to fetch watched movies"
        })
    }
})

router.get("/liked",authMiddleware, async(req,res)=>{
    try{
        const userId = req.userId
        const result = await pool.query(`SELECT m.poster_path, m.tmdb_movie_id, m.title, m.release_date, l.tmdb_movie_id IS NOT NULL AS liked, r.rating  FROM liked_movies l JOIN movies m ON l.tmdb_movie_id = m.tmdb_movie_id LEFT JOIN ratings r ON r.user_id = l.user_id AND r.tmdb_movie_id = l.tmdb_movie_id  WHERE l.user_id = $1`,[userId])

        res.status(200).json({
            liked_movies : result.rows
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            message: "failed to fetch liked movies"
        })
    }
})
router.get("/watchlist",authMiddleware, async(req,res)=>{
    try{
        const userId = req.userId
        const result = await pool.query(`SELECT m.poster_path, m.tmdb_movie_id, m.title, m.release_date FROM watchlist w JOIN movies m ON w.tmdb_movie_id = m.tmdb_movie_id WHERE w.user_id = $1`,[userId])

        res.status(200).json({
            watchlist : result.rows
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            message: "failed to fetch liked movies"
        })
    }
})

export default router