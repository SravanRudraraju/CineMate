import { useState } from "react";
import {
    FaHeart,
    FaRegHeart,
    FaStar,
    FaRegStar,
} from "react-icons/fa";

const DiaryEntry = ({ entryId, Movie, liked: initialLiked, rating: initalRating, review: initialReview, watchedDate: initialWatchedDate, onClose, onSave,onDelete }) => {
    const [rating, setRating] = useState(initalRating || 0);
    const [liked, setLiked] = useState(initialLiked || false);
    const [review, setReview] = useState(initialReview || "");
    const [watchedDate, setWatchedDate] = useState(initialWatchedDate ? initialWatchedDate.slice(0, 10) : new Date().toISOString().split("T")[0]
    );

    const handleDeleteEntry = async () => {
        const token = localStorage.getItem("token")
        const response = await fetch(`http://localhost:3000/api/diary/${entryId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        if (response.ok) {
            onDelete(entryId)
        
        } else {
            const data = await response.json()
            alert(data.message)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050507] px-4">

            <div className="relative h-[min(650px,92vh)] w-full max-w-5xl overflow-hidden rounded-[30px] border border-white/[0.1] bg-[#0c0b12] shadow-[0_40px_120px_rgba(0,0,0,0.9)]">

                {/* CSS-only atmosphere */}
                <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-purple-700/20 blur-[140px]" />

                <div className="pointer-events-none absolute -bottom-48 -right-20 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[150px]" />

                <div className="pointer-events-none absolute left-[45%] top-[35%] h-[300px] w-[300px] rounded-full bg-fuchsia-500/[0.06] blur-[120px]" />

                {/* Subtle gradient surface */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.035),transparent_35%,rgba(124,58,237,0.04))]" />

                {/* Decorative border */}
                <div className="pointer-events-none absolute inset-3 rounded-[26px] border border-white/[0.035]" />

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-5 z-20 text-4xl font-light leading-none text-white/40 transition duration-200 hover:scale-110 hover:text-white"
                >
                    ×
                </button>

                {/* Main */}
                <div className="relative flex h-full items-center px-8 py-10 md:px-12">

                    {/* Poster */}
                    <div className="relative w-[260px] shrink-0 md:w-[285px]">

                        {/* Purple poster glow */}
                        <div className="absolute -inset-5 rounded-[28px] bg-purple-600/20 blur-[35px]" />

                        {/* Blue secondary glow */}
                        <div className="absolute -bottom-8 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[45px]" />

                        <div className="relative overflow-hidden rounded-[18px] border border-white/[0.14] bg-black p-1 shadow-[0_30px_70px_rgba(0,0,0,0.75)]">

                            <img
                                src={`https://image.tmdb.org/t/p/w500${Movie.poster_path}`}
                                alt={Movie.title}
                                className="aspect-[2/3] w-full rounded-[14px] object-cover"
                            />

                            {/* Poster color overlay */}
                            <div className="pointer-events-none absolute inset-1 rounded-[14px] bg-gradient-to-tr from-purple-950/20 via-transparent to-white/[0.08]" />

                        </div>

                    </div>

                    {/* Right side */}
                    <div className="ml-10 flex min-w-0 flex-1 flex-col md:ml-14">

                        {/* Title */}
                        <div className="flex items-baseline gap-3 pr-12">

                            <h1 className="text-4xl font-semibold tracking-[-0.035em] text-white ">
                                {Movie.title}
                            </h1>

                            <span className="text-lg font-medium text-white/35">
                                {Movie.release_date?.slice(0, 4)}
                            </span>

                        </div>

                        {/* Accent line */}
                        <div className="mt-5 h-[2px] w-20 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-transparent" />

                        {/* Like + Rating */}
                        {/* Like + Rating */}
                        <div className="mt-8 flex items-center gap-7">

                            {/* Like */}
                            <button
                                onClick={() => setLiked((prev) => !prev)}
                                className={`flex h-11 w-11 shrink-0 items-center justify-center transition duration-300 hover:scale-110 ${liked
                                    ? "text-red-400 drop-shadow-[0_0_14px_rgba(236,72,153,0.45)]"
                                    : "text-white/30 hover:text-white/70"
                                    }`}
                            >
                                {liked ? (
                                    <FaHeart className="h-8 w-8" />
                                ) : (
                                    <FaRegHeart className="h-8 w-8" />
                                )}
                            </button>

                            {/* Rating */}
                            <div className="flex h-11 items-center gap-1">

                                {[1, 2, 3, 4, 5].map((star) => (
                                    <div
                                        key={star}
                                        className="relative flex h-11 w-11 items-center justify-center"
                                    >

                                        {/* Empty star */}
                                        <FaRegStar className="absolute h-9 w-9 text-white/15" />

                                        {/* Full star */}
                                        {rating >= star && (
                                            <FaStar className="absolute h-9 w-9 text-amber-400 drop-shadow-[0_0_7px_rgba(251,191,36,0.35)]" />
                                        )}

                                        {/* Half star */}
                                        {rating === star - 0.5 && (
                                            <div className="absolute left-1/2 top-1/2 h-9 w-[18px] -translate-x-full -translate-y-1/2 overflow-hidden">
                                                <FaStar className="h-9 w-9 max-w-none text-amber-400 drop-shadow-[0_0_7px_rgba(251,191,36,0.35)]" />
                                            </div>
                                        )}

                                        {/* Left half */}
                                        <button
                                            onClick={() => setRating(star - 0.5)}
                                            className="absolute left-0 top-0 h-full w-1/2"
                                        />

                                        {/* Right half */}
                                        <button
                                            onClick={() => setRating(star)}
                                            className="absolute right-0 top-0 h-full w-1/2"
                                        />

                                    </div>
                                ))}

                                {/* Remove rating */}
                                {rating > 0 && (
                                    <button
                                        onClick={() => setRating(0)}
                                        className="ml-2 text-3xl font-light leading-none text-white/30 transition hover:text-white"
                                    >
                                        ×
                                    </button>
                                )}

                            </div>

                        </div>

                        {/* Watched date */}
                        <div className="mt-8 flex items-center gap-5">

                            <label className="text-sm font-medium uppercase tracking-[0.2em] text-white/45">
                                Watched on
                            </label>

                            <input
                                type="date"
                                value={watchedDate}
                                onChange={(e) => setWatchedDate(e.target.value)}
                                className="rounded-xl border border-white/10 bg-white/[0.045] px-2 py-1 text-lg font-medium text-white/70 outline-none transition duration-200 hover:border-white/20 hover:bg-white/[0.07] focus:border-purple-400/50 focus:text-white"
                            />

                        </div>

                        {/* Review */}
                        <div className="relative mt-7">

                            <div className="absolute -left-3 top-0 h-full w-[2px] rounded-full bg-gradient-to-b from-purple-500 via-fuchsia-500/40 to-transparent" />

                            <textarea
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Write your review..."
                                className="h-54 w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-lg leading-8 text-white outline-none backdrop-blur-md transition duration-300 placeholder:text-white/20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus:border-purple-400/35 focus:bg-white/[0.04]"
                            />

                        </div>

                        {/* Save and delete*/}
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                className="rounded-full border border-red-400/20 px-6 py-3.5 text-sm font-semibold text-red-400 transition hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-300"
                                onClick={handleDeleteEntry}
                            >
                                DELETE
                            </button>
                            <button className="relative overflow-hidden rounded-full bg-gradient-to-r from-white via-white to-purple-100 px-8 py-3.5 text-sm font-bold text-black shadow-[0_8px_30px_rgba(255,255,255,0.08)] transition duration-300 hover:scale-[1.04] hover:shadow-[0_8px_35px_rgba(168,85,247,0.25)] active:scale-[0.97]"
                                onClick={() => {
                                    onSave(watchedDate, rating, liked, review)
                                }}
                            >
                                SAVE
                            </button>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default DiaryEntry;