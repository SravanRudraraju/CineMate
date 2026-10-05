import express from "express";
import pool from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId
        const profile_Data = await pool.query(`SELECT id,username,profile_image,name,bio,location,created_at FROM users WHERE id = $1`, [userId])
        const fav_movies = await pool.query(`SELECT m.tmdb_movie_id, m.title, m.poster_path,m.release_date, f.position FROM user_favourite_movies f JOIN movies m ON m.tmdb_movie_id = f.tmdb_movie_id WHERE f.user_id = $1 ORDER BY f.position`, [userId])
        const recent_diary = await pool.query(`SELECT d.id, d.tmdb_movie_id, d.watched_on, d.rating, d.liked, d.review, m.title, m.poster_path, m.release_date FROM diary_entries d  JOIN movies m ON m.tmdb_movie_id = d.tmdb_movie_id WHERE d.user_id = $1 ORDER BY d.watched_on DESC, d.id DESC LIMIT 5`, [userId])
        res.status(200).json({
            profile_data: profile_Data.rows[0],
            favourite_movies: fav_movies.rows,
            recent_diary: recent_diary.rows
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "failed to fetch profile"
        })
    }
})

router.put("/edit", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId
        const { name, bio, location, profile_image } = req.body
        const result = await pool.query(`UPDATE users SET name = $1, bio = $2, location = $3, profile_image = $4 WHERE id = $5 RETURNING *`, [name, bio, location, profile_image, userId])
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: " profile not found"
            })
        }
        res.status(200).json({
            message: "profile updated successfully",
            rating: result.rows[0]
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "failed to update profile"
        })
    }
})

router.put("/favourites", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId
        const { movies } = req.body
        if (!Array.isArray(movies) || movies.length > 5) {
            return res.status(400).json({
                message: "Maximum 5 favourite movies allowed"
            });
        }

        await pool.query(`DELETE FROM user_favourite_movies WHERE user_id = $1`, [userId])
        for (const movie of movies) {
            await pool.query(`INSERT INTO user_favourite_movies (user_id, tmdb_movie_id, position) VALUES($1,$2,$3) RETURNING *`, [userId, movie.tmdb_movie_id, movie.position])
        }
        res.status(200).json({
            message: "favourite movies updated successfully",

        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "failed to update favourite movies"
        })
    }
})
export default router