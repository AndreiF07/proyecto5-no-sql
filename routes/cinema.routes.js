const express = require('express');
const Cinema = require('../models/Cinema');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const cinemas = await Cinema.find().populate('movies');
    return res.status(200).json(cinemas);
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const cinema = await Cinema.findById(id).populate('movies');
    if (cinema) {
      return res.status(200).json(cinema);
    } else {
      return res.status(404).json('No cinema found by this id');
    }
  } catch (err) {
    return next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, address, city, capacity, movies } = req.body;
    const newCinema = new Cinema({ name, address, city, capacity, movies });
    const savedCinema = await newCinema.save();
    return res.status(201).json(savedCinema);
  } catch (err) {
    return next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedCinema = await Cinema.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (updatedCinema) {
      return res.status(200).json(updatedCinema);
    } else {
      return res.status(404).json('No cinema found by this id');
    }
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCinema = await Cinema.findByIdAndDelete(id);
    if (deletedCinema) {
      return res.status(200).json(deletedCinema);
    } else {
      return res.status(404).json('No cinema found by this id');
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
