const movieService = require("../services/movieService");

const createMovie = async (req, res) => {
  try {
    const movie = await movieService.addMovie(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movieService.updateMovie(id, req.body);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeMovie = async (req, res) => {
  try {
    const { id } = req.params;
    await movieService.deleteMovie(id);
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movieService.getMovieById(id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchAllMovies = async (req, res) => {
  try {
    const queryParams = req.query;
    const movies = await movieService.getAllMovies(queryParams);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await movieService.addReview(id, req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMovieReview = async (req, res) => {
  try {
    const { movieId, reviewId } = req.params;
    const updatedMovie = await movieService.updateReview(movieId, reviewId, req.body);
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeMovieReview = async (req, res) => {
  try {
    const { movieId, reviewId } = req.params;
    await movieService.deleteReview(movieId, reviewId);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMovieReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await movieService.getMovieReviews(id);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAverageRating = async (req, res) => {
  try {
    const { id } = req.params;
    const averageRating = await movieService.calculateAverageRating(id);
    res.json({ averageRating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMovie,
  updateMovieDetails,
  removeMovie,
  fetchMovieById,
  fetchAllMovies,
  createReview,
  updateMovieReview,
  removeMovieReview,
  getMovieReviews,
  getAverageRating,
};