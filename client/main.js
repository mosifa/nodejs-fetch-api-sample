import { Readable } from 'stream';
import { createReadStream } from 'fs';
import { FormDataEncoder } from 'form-data-encoder';

const url = 'http://localhost:3000/api/books';

// get a book
async function getBook() {
  const id = 1;
  const request = new Request(`${url}/${id}`, {
    method: 'GET'
  });

  try {
    const result = await fetch(request);
    console.log('result', await result.text());
  } catch (error) {
    console.error('error', error);
  }
}

// create a book
async function createBook() {
  const request = new Request(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      id: '1',
      title: 'Node.js fetch (beginner to advance)!'
    })
  });

  try {
    const result = await fetch(request);
    console.log('result', await result.text());
  } catch (error) {
    console.error('error', error);
  }
}

// add a cover image for a book
async function addCoverImage() {
  const id = 1;
  const formData = new FormData();
  formData.set('image', {
    type: 'Picture',
    name: 'nodejs+fetchapi.jpg',
    [Symbol.toStringTag]: 'File',
    stream: () => createReadStream('./images/nodejs+fetchapi.jpg')
  });
  const encoder = new FormDataEncoder(formData);

  const request = new Request(`${url}/${id}/cover`, {
    method: 'POST',
    headers: {
      'content-type': encoder.contentType
    },
    duplex: 'half',
    body: Readable.from(encoder)
  });

  try {
    const result = await fetch(request);
    console.log('result', await result.text());
  } catch (error) {
    console.error('error', error);
  }
}

// createBook()
// getBook()
// addCoverImage()
