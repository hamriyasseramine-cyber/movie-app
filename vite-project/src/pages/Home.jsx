import MovieCard from "../components/MovieCard";
import { useState, useEffect, useCallback, useRef } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";
import PageTransition from "../components/PageTransition";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies(1);
        setMovies(popularMovies);
        setPage(1);
        setHasMore(true);
      } catch {
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      const loadPopular = async () => {
        setLoading(true);
        try {
          const popularMovies = await getPopularMovies(1);
          setMovies(popularMovies);
          setPage(1);
          setHasMore(true);
          setError(null);
        } catch {
          setError("Failed to load movies...");
        } finally {
          setLoading(false);
        }
      };
      loadPopular();
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const searchResults = await searchMovies(searchQuery);
        setMovies(searchResults);
        setHasMore(false);
        setError(null);
      } catch {
        setError("Failed to search movies...");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore || searchQuery.trim()) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const moreMovies = await getPopularMovies(nextPage);
      if (moreMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev) => [...prev, ...moreMovies]);
        setPage(nextPage);
      }
    } catch {
      setError("Failed to load more movies...");
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, page, searchQuery]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore || searchQuery.trim()) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 },
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore, hasMore, searchQuery]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <PageTransition>
      <div className="home">
        <div className="search-form">
          <input
            type="text"
            placeholder="Search for movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery("")}>
              ✕
            </button>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : movies.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🎬</div>
            <h3>No movies found</h3>
            <p>
              No results for "<strong>{searchQuery}</strong>". Try a different
              title.
            </p>
          </div>
        ) : (
          <>
            {searchQuery && (
              <p className="results-label">
                {movies.length} results for "{searchQuery}"
              </p>
            )}
            <div className="movies-grid">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
            {hasMore && !searchQuery && (
              <div ref={loaderRef} className="scroll-trigger" />
            )}
          </>
        )}

        {showScrollTop && (
          <button className="scroll-top-btn" onClick={scrollToTop}>
            ↑
          </button>
        )}
      </div>
    </PageTransition>
  );
}

export default Home;
