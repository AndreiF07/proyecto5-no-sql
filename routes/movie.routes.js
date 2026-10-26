const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (err) {
    return next(err);
  }
});

router.get('/id/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json('No movie found by this id');
    }
  } catch (err) {
    return next(err);
  }
});

router.get('/title/:title', async (req, res, next) => {
  const { title } = req.params;

  try {
    const movieByTitle = await Movie.find({ title });
    return res.status(200).json(movieByTitle);
  } catch (err) {
    return next(err);
  }
});

router.get('/genre/:genre', async (req, res, next) => {
  const { genre } = req.params;

  try {
    const movieByGenre = await Movie.find({ genre });
    return res.status(200).json(movieByGenre);
  } catch (err) {
    return next(err);
  }
});

router.get('/year/:year', async (req, res, next) => {
  const { year } = req.params;

  try {
    const movieByYear = await Movie.find({ year: { $gt: year } });
    return res.status(200).json(movieByYear);
  } catch (err) {
    return next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, director, year, genre } = req.body;
    const newMovie = new Movie({ title, director, year, genre });
    const savedMovie = await newMovie.save();
    return res.status(201).json(savedMovie);
  } catch (err) {
    return next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (updatedMovie) {
      return res.status(200).json(updatedMovie);
    } else {
      return res.status(404).json('No movie found by this id');
    }
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (deletedMovie) {
      return res.status(200).json(deletedMovie);
    } else {
      return res.status(404).json('No movie found by this id');
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
