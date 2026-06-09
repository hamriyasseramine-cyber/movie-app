import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { getGenres, discoverMovies } from "../services/api";
import "../css/Classement.css";
import PageTransition from "../components/PageTransition";

const SORT_OPTIONS = [
  { value: "vote_average.desc", label: " Rating" },
  { value: "popularity.desc", label: " Popularity" },
  { value: "vote_count.desc", label: " Most Voted" },
];

const YEARS = Array.from({ length: 35 }, (_, i) => 2025 - i);

const LANGUAGES = [
  { value: "", label: "All Languages" },
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "pt", label: "Portuguese" },
  { value: "ar", label: "Arabic" },
  { value: "zh", label: "Chinese" },
  { value: "hi", label: "Hindi" },
];

function Classement() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("vote_average.desc");
  const [genreId, setGenreId] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    getGenres()
      .then(setGenres)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await discoverMovies({
          sortBy,
          genreId,
          year,
          language,
          page,
        });
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 20));
      } catch (err) {
        setError("Failed to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [sortBy, genreId, year, language, page]);

  const handleFilter = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };

  const activeFiltersCount = [genreId, year, language].filter(Boolean).length;

  const clearFilters = () => {
    setGenreId("");
    setYear("");
    setLanguage("");
    setSortBy("vote_average.desc");
    setPage(1);
  };

  return (
    <PageTransition>
      <div className="Classement">
        <div className="Classement-header">
          <div>
            <h1 className="Classement-title">Classement</h1>
            <p className="Classement-subtitle">
              Discover top movies, filtered your way
            </p>
          </div>
          {activeFiltersCount > 0 && (
            <button className="clear-btn" onClick={clearFilters}>
              Clear filters ({activeFiltersCount})
            </button>
          )}
        </div>

        <div className="filters-bar">
          <div className="filter-group">
            <label className="filter-label">Sort by</label>
            <div className="sort-tabs">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`sort-tab ${sortBy === opt.value ? "active" : ""}`}
                  onClick={() => {
                    setSortBy(opt.value);
                    setPage(1);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-selects">
            <div className="filter-group">
              <label className="filter-label">Genre</label>
              <select
                className="filter-select"
                value={genreId}
                onChange={handleFilter(setGenreId)}
              >
                <option value="">All Genres</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Year</label>
              <select
                className="filter-select"
                value={year}
                onChange={handleFilter(setYear)}
              >
                <option value="">All Years</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Language</label>
              <select
                className="filter-select"
                value={language}
                onChange={handleFilter(setLanguage)}
              >
                {LANGUAGES.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : movies.length === 0 ? (
          <div className="Classement-empty">
            <p>No movies found for these filters.</p>
            <button className="clear-btn" onClick={clearFilters}>
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <div className="movies-grid">
              {movies.map((movie, index) => (
                <div key={movie.id} className="ranked-card">
                  <span className="rank-badge">
                    #{(page - 1) * 20 + index + 1}
                  </span>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>

            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ← Prev
              </button>
              <span className="page-info">
                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
              </span>
              <button
                className="page-btn"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next →
              </button>
            </div>
          </>
        )}
      </div>
    </PageTransition>
  );
}

export default Classement;
