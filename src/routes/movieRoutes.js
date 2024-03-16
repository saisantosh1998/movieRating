const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController")
const authenticateToken = require("../middleware/authenticateToken");


router.post('/',authenticateToken, movieController.createMovie);
router.put('/:id',authenticateToken, movieController.updateMovieDetails);
router.delete('/:id',authenticateToken, movieController.removeMovie);
router.get('/:id',authenticateToken, movieController.fetchMovieById);
router.get('/',authenticateToken, movieController.fetchAllMovies);

// Reviews CRUD
router.post('/:id/reviews',authenticateToken, movieController.createReview);
router.put('/:movieId/reviews/:reviewId',authenticateToken, movieController.updateMovieReview);
router.delete('/:movieId/reviews/:reviewId',authenticateToken, movieController.removeMovieReview);
router.get('/:id/reviews',authenticateToken, movieController.getMovieReviews);

router.get('/:id/averageRating',authenticateToken,  movieController.getAverageRating);

module.exports = router;
