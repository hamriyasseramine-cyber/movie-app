import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import PageTransition from "../components/PageTransition";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length > 0) {
    return (
      <PageTransition>
        <div className="favorites">
          <div className="favorites-header">
            <h2>Your Favorites</h2>
            <span className="favorites-count">{favorites.length} films</span>
          </div>
          <div className="movies-grid">
            {favorites.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="favorites-empty">
        <span className="favorites-empty-icon">♡</span>
        <h2>No favorites yet</h2>
        <p>Browse movies and tap the heart icon to save them here.</p>
      </div>
    </PageTransition>
  );
}

export default Favorites;
