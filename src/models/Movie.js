const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
  text: String
});

const MovieSchema = new mongoose.Schema({
  title: String,
  director: String,
  genre: String,
  releaseYear: Number,
  description: String,
  reviews: [ReviewSchema]
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;