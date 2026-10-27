
import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  ChevronDown,
  Clapperboard,
} from "lucide-react";

const Navbar = ({ onLogFilm }) => {
  const [query, setQuery] = useState("");
  const [moviesOpen, setMoviesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isHome = ["/", "/login", "/register"].includes(location.pathname);
  const isLoggedIn = !!localStorage.getItem("token");

  const moviePaths = ["/watchlist", "/watched", "/liked/movies", "/diary"];
  const inMyMovies = moviePaths.includes(location.pathname);

  const closeMenus = () => {
    setMoviesOpen(false);
    setProfileOpen(false);
    setMobileOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    closeMenus();
    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
  };

  const linkBase =
    "group relative flex items-center rounded-xl px-3 py-2 text-[17px] font-semibold no-underline transition duration-200 hover:bg-white/[0.06] hover:text-[#FF6B1A]";

  const linkClass = `${linkBase} text-white/75`;

  const navLink = (path) =>
    `${linkBase} ${
      location.pathname === path
        ? "bg-[#FF6B1A]/10 text-[#FF6B1A]"
        : "text-white/75"
    }`;

  const dropdownClass =
    "absolute right-0 top-full z-50 mt-4 w-60 origin-top-right rounded-2xl border border-white/10 bg-[#141111]/95 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl";

  const dropdownLabel =
    "px-3 pb-2 pt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35";

  const searchBar = (
    <form
      onSubmit={handleSearch}
      className="group flex w-full items-center gap-2.5 rounded-full bg-white/[0.08] px-4 py-2.5 transition duration-300 hover:bg-white/[0.12] focus-within:bg-black/40 focus-within:shadow-[0_0_0_2px_rgba(255,107,26,0.55)]"
    >
      <Search
        size={19}
        strokeWidth={2}
        className="shrink-0 text-white/50 transition group-focus-within:text-[#FF6B1A]"
      />
      <input
        className="min-w-0 w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/45"
        type="text"
        aria-label="Search movies"
        placeholder="Find a film..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );

  return (
    <nav
      className={`${
        isHome ? "absolute left-0 right-0 top-0" : "relative"
      } z-50 w-full bg-transparent pt-4`}
    >
      <div className="relative mx-auto w-[96%] max-w-[1700px]">
        <div className="flex min-h-[86px] items-center gap-5">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenus}
            className="shrink-0 no-underline transition hover:opacity-90"
          >
            <img
              className="h-[68px] w-[230px] object-contain"
              src={logo}
              alt="CineMate"
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden min-w-0 flex-1 items-center gap-4 lg:flex">
            {isLoggedIn && (
              <>
                {/* My Movies */}
                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setMoviesOpen(!moviesOpen);
                      setProfileOpen(false);
                    }}
                    aria-expanded={moviesOpen}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-[18px] font-bold tracking-wide transition duration-200 hover:bg-white/[0.06] hover:text-[#FF6B1A] ${
                      moviesOpen || inMyMovies
                        ? "bg-white/[0.06] text-[#FF6B1A]"
                        : "text-white/90"
                    }`}
                  >
                    MY MOVIES
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        moviesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {moviesOpen && (
                    <div
                      className={`${dropdownClass} left-0 right-auto origin-top-left`}
                    >
                      <p className={dropdownLabel}>Your collection</p>
                      <Link
                        to="/watchlist"
                        onClick={closeMenus}
                        className={navLink("/watchlist")}
                      >
                        Watchlist
                      </Link>
                      <Link
                        to="/watched"
                        onClick={closeMenus}
                        className={navLink("/watched")}
                      >
                        Watched Films
                      </Link>
                      <Link
                        to="/liked/movies"
                        onClick={closeMenus}
                        className={navLink("/liked/movies")}
                      >
                        Liked Films
                      </Link>
                      <Link
                        to="/diary"
                        onClick={closeMenus}
                        className={navLink("/diary")}
                      >
                        Diary
                      </Link>
                    </div>
                  )}
                </div>

                {/* Profile — same visual style as My Movies */}
                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(!profileOpen);
                      setMoviesOpen(false);
                    }}
                    aria-label="Profile menu"
                    aria-expanded={profileOpen}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-[18px] font-bold tracking-wide transition duration-200 hover:bg-white/[0.06] hover:text-[#FF6B1A] ${
                      profileOpen || location.pathname === "/profile"
                        ? "bg-white/[0.06] text-[#FF6B1A]"
                        : "text-white/90"
                    }`}
                  >
                    PROFILE
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {profileOpen && (
                    <div
                      className={`${dropdownClass} left-0 right-auto origin-top-left`}
                    >
                      <Link
                        to="/profile"
                        onClick={closeMenus}
                        className={navLink("/profile")}
                      >
                        My Profile
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          localStorage.removeItem("token");
                          closeMenus();
                          navigate("/");
                        }}
                        className={`${linkClass} w-full text-left hover:!bg-red-500/10 hover:!text-red-400`}
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Search */}
            <div className="w-48 min-w-0 flex-1 xl:max-w-[280px]">
              {searchBar}
            </div>

            {/* Log a Film — original styling preserved */}
            {isLoggedIn && (
              <button
                type="button"
                onClick={onLogFilm}
                className="group ml-auto mr-16 flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-[#FF6B1A]/70 bg-gradient-to-br from-[#FF8A35] to-[#F04B16] px-4 py-2.5  text-base font-extrabold tracking-wide text-[#160B06] shadow-[0_3px_0_#9D310C] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_0_#9D310C] active:translate-y-0.5 active:shadow-none"
              >
                <Clapperboard
                  size={19}
                  strokeWidth={2.5}
                  className="transition-transform group-hover:-rotate-6"
                />
                LOG A FILM
              </button>
            )}

            {!isLoggedIn && (
              <div className="ml-auto flex shrink-0 items-center gap-3">
                <Link
                  to="/login"
                  className="whitespace-nowrap rounded-full px-4 py-2 text-[15px] font-bold text-white/85 no-underline transition hover:bg-white/[0.06] hover:text-[#FF6B1A]"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="whitespace-nowrap rounded-full bg-[#FF6B1A] px-5 py-2.5 text-[15px] font-bold text-black no-underline transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff843d]"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl transition lg:hidden ${
              mobileOpen
                ? "bg-[#FF6B1A]/15 text-[#FF6B1A]"
                : "bg-white/[0.08] text-white hover:bg-white/[0.14]"
            }`}
          >
            {mobileOpen ? "×" : "☰"}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileOpen && (
          <div className="mt-2 rounded-2xl bg-[#110F0F]/95 px-4 pb-5 pt-4 shadow-[0_24px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl lg:hidden">
            <div className="mb-4">{searchBar}</div>

            {isLoggedIn ? (
              <div className="space-y-1">
                <p className={dropdownLabel}>My Movies</p>

                <Link
                  to="/watchlist"
                  onClick={closeMenus}
                  className={navLink("/watchlist")}
                >
                  Watchlist
                </Link>
                <Link
                  to="/watched"
                  onClick={closeMenus}
                  className={navLink("/watched")}
                >
                  Watched Films
                </Link>
                <Link
                  to="/liked/movies"
                  onClick={closeMenus}
                  className={navLink("/liked/movies")}
                >
                  Liked Films
                </Link>
                <Link
                  to="/diary"
                  onClick={closeMenus}
                  className={navLink("/diary")}
                >
                  Diary
                </Link>

                <div className="my-3 border-t border-white/10" />

                <p className={dropdownLabel}>Profile</p>
                <Link
                  to="/profile"
                  onClick={closeMenus}
                  className={navLink("/profile")}
                >
                  Profile
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    closeMenus();
                    onLogFilm?.();
                  }}
                  className="group mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[#FF6B1A]/70 bg-gradient-to-br from-[#FF8A35] to-[#F04B16] px-4 py-2.5 text-base font-extrabold tracking-wide text-[#160B06] shadow-[0_3px_0_#9D310C] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_0_#9D310C] active:translate-y-0.5 active:shadow-none"
                >
                  <Clapperboard
                    size={19}
                    strokeWidth={2.5}
                    className="transition-transform group-hover:-rotate-6"
                  />
                  LOG A FILM
                </button>

                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("token");
                    closeMenus();
                    navigate("/");
                  }}
                  className={`${linkClass} mt-2 w-full text-left hover:!bg-red-500/10 hover:!text-red-400`}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  onClick={closeMenus}
                  className="flex-1 rounded-xl bg-white/[0.08] px-3 py-3 text-center text-base font-bold text-white no-underline transition hover:bg-white/[0.14]"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenus}
                  className="flex-1 rounded-xl bg-[#FF6B1A] px-3 py-3 text-center text-base font-bold text-black no-underline transition duration-200 hover:bg-[#ff843d]"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
