import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/books/${id}`)
      .then(response => {
        setBook(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching book details:", error);
      });
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{book.judul}</h1>
      <img src={`http://localhost:8000/storage/${book.image}`} alt={book.judul} className="mb-4" />
      <p><strong>Penulis:</strong> {book.penulis}</p>
      <p><strong>Penerbit:</strong> {book.penerbit}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Tahun Terbit:</strong> {book.tahun_terbit}</p>
      <p><strong>Stok:</strong> {book.stok}</p>
      <p><strong>Deskripsi:</strong> {book.description}</p>
      <p><strong>Kategori:</strong> {book.category}</p>
    </div>
  );
};

export default BookDetail;

//Backend coba cek disini untuk tampilan BOOK DETAIL ketika user klik buku nya