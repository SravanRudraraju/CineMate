import express from "express";
import pool from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId
        const profile_Data = await pool.query(`SELECT id,username,profile_image,name,bio,location,created_at FROM users WHERE id = $1`, [userId])
        const fav_movies = await pool.query(`SELECT m.tmdb_movie_id, m.title, m.poster_path,m.release_date, f.position FROM user_favourite_movies f JOIN movies m ON m.tmdb_movie_id = f.tmdb_movie_id WHERE f.user_id = $1 ORDER BY f.position`,[userId])
        const recent_diary = await pool.query(`SELECT d.id, d.tmdb_movie_id, d.watched_on, d.rating, d.liked, d.review, m.title, m.poster_path, m.release_date FROM diary_entries d  JOIN movies m ON m.tmdb_movie_id = d.tmdb_movie_id WHERE d.user_id = $1 ORDER BY d.watched_on DESC, d.id DESC LIMIT 5`,[userId])
        res.status(200).json({
            profile_data : profile_Data.rows[0],
            favourite_movies : fav_movies.rows,
            recent_diary : recent_diary.rows
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "failed to fetch profile"
        })
    }


})


export default router