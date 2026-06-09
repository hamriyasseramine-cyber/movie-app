const API_KEY = "89cfa0d246e7d44b73d7751b7526317d";
const BASE_URL = "https://api.themoviedb.org/3";

// ── Popular movies avec pagination ────────────────────────────
export const getPopularMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
  );
  const data = await response.json();
  return data.results;
};

// ── Search movies ─────────────────────────────────────────────
export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );
  const data = await response.json();
  return data.results;
};

async function fetchMovieDetail(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=89cfa0d246e7d44b73d7751b7526317d&language=en-US&append_to_response=credits,videos,similar`;
  console.log("Fetching:", url);
  const res = await fetch(url);
  console.log("Status:", res.status);
  const data = await res.json();
  console.log("Data:", data);
  if (!res.ok) throw new Error("Not found");
  return data;
}

// ── Genre list ────────────────────────────────────────────────
export const getGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en`,
  );
  const data = await response.json();
  return data.genres;
};

// ── Discover with filters ─────────────────────────────────────
export const discoverMovies = async ({
  sortBy = "vote_average.desc",
  genreId = "",
  year = "",
  language = "",
  page = 1,
} = {}) => {
  const params = new URLSearchParams({
    api_key: API_KEY,
    sort_by: sortBy,
    page,
    "vote_count.gte": 200,
  });

  if (genreId) params.append("with_genres", genreId);
  if (year) params.append("primary_release_year", year);
  if (language) params.append("with_original_language", language);

  const response = await fetch(`${BASE_URL}/discover/movie?${params}`);
  const data = await response.json();
  return data;
};
