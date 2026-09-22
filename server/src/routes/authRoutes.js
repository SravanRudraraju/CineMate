import express from "express";
import bcrypt from "bcrypt"
import pool from "../db.js"


const router = express.Router()


router.post("/register", async (req, res) => {
    try {

        const { email, username, password } = req.body

        if (!email || !username || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const existingEmail = await pool.query("SELECT id FROM users WHERE email = $1", [email])

        if (existingEmail.rows.length > 0) {
            return res.status(409).json({ message: "email already exists" })
        }

        const existingUsername = await pool.query("SELECT id FROM users WHERE username = $1", [username])

        if (existingUsername.rows.length > 0) {
            return res.status(409).json({ message: "username already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await pool.query(`INSERT INTO users(email,username,password_hash) VALUES($1,$2,$3) RETURNING id,email,username`, [email, username, hashedPassword])

        res.status(201).json({
            message: "User registered successfully",
            user: result.rows[0]
        })
    }catch(error){
        console.error(error);
        res.status(500).json({
            message : "Something went wrong"
        })
    }
            
})
export default router;