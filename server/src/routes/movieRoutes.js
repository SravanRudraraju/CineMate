import express from "express";
import pool from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { getMovieById } from "../services/tmdbService.js";

const router = express.Router();

router.post("/:id/watchlist", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId
        const movieId = req.params.id
        const Movie = await getMovieById(movieId)

        await pool.query(`INSERT INTO movies (tmdb_movie_id, title, poster_path, release_date) VALUES ($1, $2, $3, $4) ON CONFLICT (tmdb_movie_id) DO NOTHING`,
            [Movie.id, Movie.title, Movie.poster_path, Movie.release_date])

        const result = await pool.query(`INSERT INTO watchlist (user_id, tmdb_movie_id) VALUES ($1,$2) ON CONFLICT (user_id, tmdb_movie_id) DO NOTHING RETURNING * `, [userId, movieId])

        if (result.rows.length === 0) {
            return res.status(200).json({
                message: "Movie is already in watchlist"
            })
        }
        res.status(201).json({
            message: "Movie added to watchlist",
            watchlist: result.rows[0]
        })

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to add movie to watchlist"
        })

    }
})
router.delete("/:id/watchlist", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId
        const movieId = req.params.id

        const result = await pool.query(`DELETE FROM WATCHLIST WHERE user_id = $1 and tmdb_movie_id = $2 returning  *`, [userId, movieId])

        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "Movie is not in watchlist"
            })
        }
        res.status(200).json({
            message: "Movie removed from watchlist"
        })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: "Failed to remove from watchlist"
        })

    }
})

router.get("/:id/watchlist", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const movieId = req.params.id

        const result = await pool.query(`SELECT 1 FROM watchlist WHERE user_id = $1 AND tmdb_movie_id = $2`, [userId, movieId])

        res.status(200).json({
            inWatchlist: result.rows.length > 0
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Failed to check watchlist"
        })
    }
})

router.post("/:id/like", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId
        const movieId = req.params.id
        const Movie = await getMovieById(movieId)

        await pool.query(`INSERT INTO movies (tmdb_movie_id, title, poster_path, release_date) VALUES ($1, $2, $3, $4) ON CONFLICT (tmdb_movie_id) DO NOTHING`,
            [Movie.id, Movie.title, Movie.poster_path, Movie.release_date])

        const result = await pool.query(`INSERT INTO liked_movies(user_id, tmdb_movie_id)  values($1, $2) ON CONFLICT (user_id, tmdb_movie_id) DO NOTHING RETURNING *`, [userId, movieId])

        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "Movie is already liked"
            })
        }
        res.status(200).json({
            message: "You liked the movie"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Failed to like the movie"
        })
    }

})

router.delete("/:id/like", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId
        const movieId = req.params.id

        const result = await pool.query(`DELETE FROM liked_movies WHERE user_id = $1 AND tmdb_movie_id = $2 RETURNING *`, [userId, movieId])

        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "movie is not liked"
            })
        }
        res.status(200).json({
            message: "movie unliked"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "failed to unlike the movie"
        })
    }

})

router.get("/:id/like", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId
        const movieId = req.params.id

        const result = await pool.query(`SELECT 1 FROM liked_movies WHERE user_id = $1 and tmdb_movie_id = $2`, [userId, movieId])

        res.status(200).json({
            isLiked: result.rows.length > 0
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "failed to check liked status"
        })
    }
})


router.post("/:id/watch", authMiddleware, async (req, res) => {
    try {


        const userId = req.userId
        const movieId = req.params.id
        const Movie = await getMovieById(movieId)

        await pool.query(`INSERT INTO movies (tmdb_movie_id, title, poster_path, release_date) VALUES ($1, $2, $3, $4) ON CONFLICT (tmdb_movie_id) DO NOTHING`,
            [Movie.id, Movie.title, Movie.poster_path, Movie.release_date])
        const result = await pool.query(`INSERT INTO watched_movies(user_id, tmdb_movie_id) VALUES($1,$2) ON CONFLICT (user_id, tmdb_movie_id) DO NOTHING RETURNING *`, [userId, movieId])

        if (result.rows.length === 0) {
            return res.status(200).json({
                message: "movie already marked as watched"

            })
        }

        res.status(201).json({
            message: "movie marked as watched"
        })
        await pool.query(`DELETE FROM watchlist WHERE user_id = $1 and tmdb_movie_id = $2`, [userId, movieId])

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "failed to mark the movie as watched"
        })
    }
})

router.delete("/:id/watch", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId
        const movieId = req.params.id

        const result = await pool.query(`DELETE FROM watched_movies WHERE user_id = $1 AND tmdb_movie_id = $2 RETURNING *`, [userId, movieId])

        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "movie not marked as watched"
            })
        }
        res.status(200).json({
            message: "movie unwatched"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "failed to unwatch the movie"
        })
    }
})

router.get("/:id/watch", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId
        const movieId = req.params.id

        const result = await pool.query("SELECT 1 FROM watched_movies WHERE user_id = $1 AND tmdb_movie_id = $2", [userId, movieId])

        res.status(200).json({
            isWatched: result.rows.length > 0
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "failed to check watched status"
        })
    }
})

router.put("/:id/rating", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId
        const movieId = req.params.id
        const { rating } = req.body

        if (rating < 0.5 || rating > 5) {
            res.status(400).json({
                message: "rating must be between 0.5 and 5 in half star increments"
            })
        }

        const result = await pool.query(`INSERT INTO ratings (user_id, tmdb_movie_id,rating) VALUES($1,$2,$3) ON CONFLICT(user_id, tmdb_movie_id) DO UPDATE SET rating = EXCLUDED.rating RETURNING *`, [userId, movieId, rating])

        res.status(200).json({
            message: "rating saved successfully",
            rating: result.rows[0]
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: "Failed to save rating"
        })
    }
})

router.delete("/:id/rating", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId
        const movieId = req.params.id

        const result = await pool.query(`DELETE FROM ratings WHERE user_id = $1 AND tmdb_movie_id = $2 RETURNING *`, [userId, movieId])

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "movie not rated"
            })
        }
        res.status(200).json({
            message: "movie rating deleted"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "failed to delete the rating"
        })
    }
})

router.get("/:id/rating", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId
        const movieId = req.params.id

        const result = await pool.query("SELECT rating FROM ratings WHERE user_id = $1 AND tmdb_movie_id = $2", [userId, movieId])

        if (result.rows.length === 0) {
            return res.status(200).json({
                rating: null
            })
        }
        res.status(200).json({
            rating: result.rows[0].rating
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "failed to fetch rating"
        })
    }
})

router.post("/:id/diary", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId
        const movieId = req.params.id
        const { watched_on, rating, liked, review } = req.body

        const Movie = await getMovieById(movieId)

        await pool.query(`INSERT INTO movies (tmdb_movie_id, title, poster_path, release_date) VALUES ($1, $2, $3, $4) ON CONFLICT (tmdb_movie_id) DO NOTHING`,
            [Movie.id, Movie.title, Movie.poster_path, Movie.release_date])

        await pool.query(`INSERT INTO diary_entries (user_id,tmdb_movie_id,watched_on,review,rating,liked) values ($1,$2,$3,$4,$5,$6)`, [userId, movieId, watched_on, review, rating, liked])

        await pool.query(`INSERT INTO watched_movies(user_id, tmdb_movie_id) VALUES($1,$2) ON CONFLICT (user_id, tmdb_movie_id) DO NOTHING RETURNING *`, [userId, movieId])
        await pool.query(`DELETE FROM watchlist WHERE user_id = $1 and tmdb_movie_id = $2`, [userId, movieId])
        if (liked) {
            await pool.query(`INSERT INTO liked_movies(user_id,tmdb_movie_id) VALUES($1,$2) ON CONFLICT (user_id,tmdb_movie_id) DO NOTHING`, [userId, movieId])
        } else {
            await pool.query(`DELETE FROM liked_movies WHERE user_id = $1 AND tmdb_movie_id = $2`, [userId, movieId])
        }

        if (rating > 0) {
            await pool.query(`INSERT INTO ratings (user_id, tmdb_movie_id,rating) VALUES($1,$2,$3) ON CONFLICT(user_id, tmdb_movie_id) DO UPDATE SET rating = EXCLUDED.rating`, [userId, movieId, rating])
        }

        res.status(200).json({
            message: "diary entry added"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "failed to update diary entry"
        })
    }
})


export default router