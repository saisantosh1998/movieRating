const Movie  = require('../models/Movie');

const addMovie = async (movieData) => {
  try {
    const movie = new Movie(movieData);
    await movie.save();
    return movie;
  } catch (error) {
    throw error;
  }
};

const updateMovie = async (movieId, newData) => {
  try {
    const movie = await Movie.findByIdAndUpdate(movieId, newData, { new: true });
    return movie;
  } catch (error) {
    throw error;
  }
};

const deleteMovie = async (movieId) => {
  try {
    await Movie.findByIdAndDelete(movieId);
  } catch (error) {
    throw error;
  }
};

const getMovieById = async (movieId) => {
  try {
    const movie = await Movie.findById(movieId);
    return movie;
  } catch (error) {
    throw error;
  }
};

const getAllMovies = async (queryParams) => {
  try {
    const movies = await Movie.find(queryParams).populate({
      path: 'reviews',
      populate: { path: 'user', select: 'email' }
    });
    return movies;
  } catch (error) {
    throw error;
  }
};

const addReview = async (movieId, reviewData) => {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new Error('Movie not found');
    }
    movie.reviews.push(reviewData);
    await movie.save();
    return movie;
  } catch (error) {
    throw error;
  }
};

const updateReview = async (movieId, reviewId, newData) => {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new Error('Movie not found');
    }
    const review = movie.reviews.id(reviewId);
    if (!review) {
      throw new Error('Review not found');
    }
    review.rating = newData.rating;
    review.text = newData.text;
    await movie.save();
    return movie;
  } catch (error) {
    throw error;
  }
};

const deleteReview = async (movieId, reviewId) => {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new Error('Movie not found');
    }
    const reviewIndex = movie.reviews.findIndex(review => review._id.toString() === reviewId);
    if (reviewIndex === -1) {
      throw new Error('Review not found');
    }
    movie.reviews.splice(reviewIndex, 1); // Remove the review from the array
    await movie.save();
  } catch (error) {
    throw error;
  }
};

const getMovieReviews = async (movieId) => {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie.reviews;
  } catch (error) {
    throw error;
  }
};

const calculateAverageRating = async (movieId) => {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie || !movie.reviews || movie.reviews.length === 0) {
      throw new Error('Movie not found or no reviews available');
    }
    const totalRatings = movie.reviews.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalRatings / movie.reviews.length;
    return averageRating;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
  getAllMovies,
  addReview,
  updateReview,
  deleteReview,
  getMovieReviews,
  calculateAverageRating,
};
