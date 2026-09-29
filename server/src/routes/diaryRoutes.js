import express from "express";
import pool from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId
        const result = await pool.query(`SELECT d.id, d.watched_on, d.review, d.rating, d.liked, m.tmdb_movie_id, m.title, m.poster_path, m.release_date FROM diary_entries d JOIN movies m ON d.tmdb_movie_id = m.tmdb_movie_id WHERE d.user_id = $1 ORDER BY d.watched_on DESC`, [userId])

        res.status(200).json({
            diary: result.rows
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "failed to fetch diary"
        })
    }
})

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const entryId = req.params.id
        const userId = req.userId   
        const { watched_on, rating, liked, review } = req.body
    
        const result = await pool.query(`UPDATE diary_entries SET watched_on = $1, rating = $2, liked = $3 , review = $4 WHERE id=$5 and user_id = $6 RETURNING *`, [watched_on, rating, liked, review, entryId, userId])

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Diary entry not found"
            })
        }
        res.status(201).json({
            message: "diary entry updated successfully",
            rating: result.rows[0]
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "failed to edit diary entry"
        })
    }

})
export default router