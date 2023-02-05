import express from 'express';
import book from '../controllers/book.js';

const books = express.Router();

export default books
  .post('/', (req, res) => book.save(req, res))
  .get('/:id', (req, res) => book.get(req, res))
  .post('/:id/cover', (req, res) => book.addImage(req, res));
