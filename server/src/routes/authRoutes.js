import express from "express";
import bcrypt from "bcrypt"
import pool from "../db.js"
import jwt from "jsonwebtoken"
import "dotenv/config";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router()


router.post("/register", async (req, res) => {
    try {

        const { email, username, password } = req.body

        if (!email || !username || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const passwordLength = [...password].length
        const passwordBytes = Buffer.byteLength(password, "utf-8")
        if (passwordLength < 8) {
            return res.status(400).json({
                message: "password must be alteast 8 characters long"
            })
        }
        if (passwordBytes > 72) {
            return res.status(400).json({
                message: "password is too long"
            })
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }

})

router.post("/login", async (req, res) => {
    const { login, password } = req.body
    if (!login || !password) {
        return res.status(400).json({
            message: "empty fields"
        })
    }
    const result = await pool.query(`SELECT * FROM users WHERE username = $1 OR email = $1`, [login])
    const data = result.rows[0]
    if (!data) {
        return res.status(401).json({
            message: "invalid credentials"
        })
    }
    const passwordMatch = await bcrypt.compare(password, data.password_hash)
    if (!passwordMatch) {
        return res.status(401).json({
            message: "invalid credentials"
        })
    }
    const token = jwt.sign(
        {userId : data.id},
        process.env.JWT_SECRET,
        {expiresIn : "1d"}
        
    )
    res.status(200).json({
        message: "Login successful",
        token : token,
        user: {
            id : data.id,
            username : data.username,
            email : data.email
        }
    })
})



export default router;