import React, { useState } from 'react';
import initialBooks from './books';
import './book.css';

const Book = () => {
  const [books, setBooks] = useState(initialBooks);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddBook = (e) => {
    e.preventDefault();
    const newBook = {
      id: books.length + 1,
      title,
      description,
      author,
      year,
      image,
    };
    setBooks([...books, newBook]);
    setTitle('');
    setDescription('');
    setAuthor('');
    setYear('');
    setImage('');
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResetSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="container mt-5">
  <h2 className="mb-4 text-center title-spacing">📚 Daftar Buku</h2>

      {/* Pencarian */}
      <div className="search-section mb-5 p-4 shadow-sm bg-light rounded">
        <div className="row align-items-center">
          <div className="col-md-9">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="🔍 Cari buku berdasarkan judul..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-3 mt-2 mt-md-0">
            <button
              className="btn btn-outline-danger w-100"
              onClick={handleResetSearch}
              disabled={!searchTerm}
            >
              Reset Pencarian
            </button>
          </div>
        </div>
      </div>

      {/* Form Tambah Buku */}
      <div className="form-section p-4 shadow-sm bg-white rounded mb-5">
        <h4 className="mb-3">➕ Tambah Buku Baru</h4>
        <form onSubmit={handleAddBook} className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Judul"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Deskripsi"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Penulis"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Tahun"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="URL Gambar"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary w-100">
              Simpan Buku
            </button>
          </div>
        </form>
      </div>

      {/* Daftar Buku */}
      <div className="row">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div className="col-md-4 mb-4" key={book.id}>
              <div className="card book-card h-100 shadow-sm rounded">
                <img
                  src={book.image}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">{book.description}</p>
                </div>
                <div className="card-footer text-muted">
                  {book.author} - {book.year}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center">
            Tidak ada buku yang cocok dengan pencarian.
          </p>
        )}
      </div>
    </div>
  );
};

export default Book;
