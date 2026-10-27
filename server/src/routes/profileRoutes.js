import express from "express";
import pool from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { getMovieById } from "../services/tmdbService.js";

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
            recent_movies: recent_diary.rows
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "failed to fetch profile"
        })
    }
})

router.put("/", authMiddleware, async (req, res) => {
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
    let client;

    try {
        const userId = req.userId;
        const { movies } = req.body;

        // Validate the request
        if (!Array.isArray(movies) || movies.length > 5) {
            return res.status(400).json({
                message: "Maximum 5 favourite movies allowed."
            });
        }

        // Validate movie IDs and positions
        const positions = new Set();
        const movieIds = new Set();

        for (const movie of movies) {
            if (
                !movie ||
                !Number.isInteger(Number(movie.tmdb_movie_id)) ||
                Number(movie.tmdb_movie_id) <= 0 ||
                !Number.isInteger(Number(movie.position)) ||
                Number(movie.position) < 1 ||
                Number(movie.position) > 5 ||
                positions.has(Number(movie.position)) ||
                movieIds.has(Number(movie.tmdb_movie_id))
            ) {
                return res.status(400).json({
                    message: "Invalid or duplicate favourite movie selection."
                });
            }

            positions.add(Number(movie.position));
            movieIds.add(Number(movie.tmdb_movie_id));
        }

        // Fetch movie details before changing the database
        const movieDetails = await Promise.all(
            movies.map(async (movie) => ({
                selection: movie,
                details: await getMovieById(movie.tmdb_movie_id)
            }))
        );

        // Start the database transaction
        client = await pool.connect();
        await client.query("BEGIN");

        // Delete existing favourites
        await client.query(
            "DELETE FROM user_favourite_movies WHERE user_id = $1",
            [userId]
        );

        // Save the new favourites
        for (const { selection, details } of movieDetails) {
            await client.query(
                `INSERT INTO movies
                (tmdb_movie_id, title, poster_path, release_date)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (tmdb_movie_id) DO NOTHING`,
                [
                    details.id,
                    details.title,
                    details.poster_path,
                    details.release_date
                ]
            );

            await client.query(
                `INSERT INTO user_favourite_movies
                (user_id, tmdb_movie_id, position)
                VALUES ($1, $2, $3)`,
                [
                    userId,
                    details.id,
                    Number(selection.position)
                ]
            );
        }

        // Save all changes
        await client.query("COMMIT");

        return res.status(200).json({
            message: "Favourite movies updated successfully."
        });

    } catch (error) {
        // Undo database changes if something fails
        if (client) {
            try {
                await client.query("ROLLBACK");
            } catch (rollbackError) {
                console.error(
                    "Favourite movies rollback failed:",
                    rollbackError
                );
            }
        }

        console.error("Failed to update favourite movies:", error);

        return res.status(500).json({
            message: "Failed to update favourite movies. Please try again."
        });

    } finally {
        // Return the connection to the pool
        if (client) {
            client.release();
        }
    }
});

export default router