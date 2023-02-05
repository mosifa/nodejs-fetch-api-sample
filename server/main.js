import express from 'express';
import books from './routes/book.js';

const port = 3000;
const app = express();
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello, world!\n welcome to the server.');
});
app.use('/api/books', books);

app.listen(port, ()=> {
    console.log(`server started at localhost:${port}`)
});