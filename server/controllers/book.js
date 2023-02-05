import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
const upload = multer({ storage: storage });

class Book {
  #books = {};

  get(req, res) {
    const book = this.#books[req.params.id];
    return book ? res.status(200).send(book) : res.status(404).send('Not found.');
  }

  save(req, res) {
    const book = req.body;
    this.#books[book.id] = book;
    return res.status(201).send('Successfully saved.');
  }

  addImage(req, res) {
    const { id } = req.params;
    if (!this.#books[id]) return res.status(404).send('Not found.');

    upload.single('image')(req, res, (error) => {
      if (error) throw new Error(error);
      this.#books[id]['imageId'] = req.file.originalname;
      return res.status(200).send('Successfully saved.');
    });
  }
}

const book = new Book();
export default book;
