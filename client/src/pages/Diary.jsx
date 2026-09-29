import React from 'react'
import { useState, useEffect } from 'react'
import { FaRegEdit, FaHeart, FaStar, FaRegStar, FaRegHeart } from "react-icons/fa";
import DiaryEntry from "../components/DiaryEntry";

const Diary = () => {
  const [diary, setDiary] = useState([])

  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    const fetchDiary = async () => {
      const token = localStorage.getItem("token")

      const response = await fetch("http://localhost:3000/api/diary", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (response.ok) {
        setDiary(data.diary)

      } else {
        alert(data.message)
      }
    }
    fetchDiary()
  }, [])


  const handleEditDiary = async (watchedDate, rating, liked, review) => {
  const token = localStorage.getItem("token");

  const updatedData = {
    watched_on: watchedDate,
    rating: rating || null,
    liked,
    review
  };


  const response = await fetch(
    `http://localhost:3000/api/diary/${editingEntry.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    alert(data.message);
    return;
  }

  setDiary((prev) =>
    prev.map((entry) =>
      entry.id === editingEntry.id
        ? { ...entry, ...updatedData }
        : entry
    )
  );

  setEditingEntry(null);
};

  return (
    <div className="mx-auto mt-8 w-full max-w-7xl px-8">
      {diary.map((entry) => {
        const date = new Date(entry.watched_on);
        const rating = Number(entry.rating) || 0;

        return (
          <div
            key={entry.id}
            className="group flex min-h-[145px] items-center border-b border-white/[0.08] py-6"
          >
            {/* Watched on */}
            <div className="w-28 shrink-0">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/45">
                {date.toLocaleString("en-US", { month: "short" })}
              </p>

              <p className="mt-1 text-4xl font-semibold leading-none text-white">
                {date.getDate()}
              </p>

              <p className="mt-1 text-sm text-white/40">
                {date.getFullYear()}
              </p>
            </div>

            {/* Poster */}
            <img
              src={`https://image.tmdb.org/t/p/w200${entry.poster_path}`}
              alt={entry.title}
              className="ml-4 h-[90px] w-[60px] shrink-0 rounded-md object-cover shadow-lg"
            />

            {/* Content */}
            <div className="ml-7 flex min-w-0 flex-1 items-center gap-7">

              {/* Title + year */}
              <div className="flex shrink-0 items-baseline gap-2">
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  {entry.title}
                </h2>

                <span className="text-base text-white/45">
                  {entry.release_date?.slice(0, 4)}
                </span>
              </div>

              {/* Review */}
              {entry.review && (
                <p className="min-w-0 flex-1 text-lg leading-7 text-white/75">
                  {entry.review}
                </p>
              )}

              {/* Rating */}
              <div className="flex shrink-0 items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => {
                  const full = rating >= star;
                  const half = rating === star - 0.5;

                  return (
                    <div key={star} className="relative h-6 w-6">
                      {/* Empty star */}
                      <FaRegStar className="absolute h-6 w-6 text-white/20" />

                      {/* Full star */}
                      {full && (
                        <FaStar className="absolute h-6 w-6 text-amber-400" />
                      )}

                      {/* Half star */}
                      {half && (
                        <div className="absolute left-0 top-0 h-6 w-3 overflow-hidden">
                          <FaStar className="h-6 w-6 text-amber-400" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Like */}
              <button className="shrink-0">
                {entry.liked ? (
                  <FaHeart className="h-6 w-6 text-red-400" />
                ) : (
                  <FaRegHeart className="h-6 w-6 text-white/30 transition hover:text-white/70" />
                )}
              </button>

              {/* Edit */}
              <button
                title="Edit diary entry" onClick={() => setEditingEntry(entry)}
                className="shrink-0 rounded-lg p-2 text-white/50 transition duration-200 hover:bg-white/[0.08] hover:text-white"
              >
                <FaRegEdit className="h-5 w-5" />
              </button>
            </div>
          </div>
        );
      })}
      {editingEntry && (
        <DiaryEntry
          Movie={{
            id: editingEntry.tmdb_movie_id,
            title: editingEntry.title,
            poster_path: editingEntry.poster_path,
            release_date: editingEntry.release_date
          }}
          rating={Number(editingEntry.rating) || 0}
          liked={editingEntry.liked}
          review={editingEntry.review || ""}
          watchedDate={editingEntry.watched_on}
          onClose={() => setEditingEntry(null)}
           onSave={handleEditDiary}
        />
      )}
    </div>

  )
}

export default Diary
