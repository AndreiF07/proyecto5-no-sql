const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const Cinema = require('../models/Cinema');

const urlDb = 'mongodb://localhost:27017/proyecto-basico-express-movies';

const buildCinemas = (movieDocs) => {
  const findId = (title) => movieDocs.find((movie) => movie.title === title)?._id;

  return [
    {
      name: 'Cine Gran Vía',
      address: 'Calle Gran Vía, 25',
      city: 'Madrid',
      capacity: 200,
      movies: [findId('The Matrix'), findId('The Matrix Reloaded')],
    },
    {
      name: 'Cine Diagonal',
      address: 'Avenida Diagonal, 100',
      city: 'Barcelona',
      capacity: 150,
      movies: [findId('Buscando a Nemo'), findId('Buscando a Dory')],
    },
    {
      name: 'Cine Costa del Sol',
      address: 'Paseo Marítimo, 10',
      city: 'Málaga',
      capacity: 180,
      movies: [findId('Interestelar'), findId('50 primeras citas')],
    },
  ];
};

mongoose
  .connect(urlDb)
  .then(async () => {
    const allCinemas = await Cinema.find();
    if (allCinemas.length) {
      await Cinema.collection.drop();
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    const movieDocs = await Movie.find();
    const cinemas = buildCinemas(movieDocs);
    const cinemaDocuments = cinemas.map((cinema) => new Cinema(cinema));
    await Cinema.insertMany(cinemaDocuments);
    console.log('DatabaseCreated');
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());
