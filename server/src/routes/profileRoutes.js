import express from "express";
import pool from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId])
        res.status(200).json({
            profile : result.rows[0]
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "failed to fetch profile"
        })
    }


})


export default router