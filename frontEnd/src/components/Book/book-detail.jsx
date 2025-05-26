import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookModal } from "../item/book-modal";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/book/${id}`)
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
      <img src={`http://localhost:8000/storage/${book.image}`} alt={book.judul} className="mb-4 w-64" />
      <p><strong>Penulis:</strong> {book.penulis}</p>
      <p><strong>Penerbit:</strong> {book.penerbit}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Tahun Terbit:</strong> {book.tahun_terbit}</p>
      <p><strong>Stok:</strong> {book.stok}</p>
      <p><strong>Deskripsi:</strong> {book.description}</p>
      <p><strong>Kategori:</strong> {book.category}</p>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
      >
        Pinjam Buku
      </button>

      {/* Modal untuk meminjam buku */}
      <BookModal
  book={{
    id: book.id,
    title: book.judul,
    author: book.penulis,
    year: book.tahun_terbit,
    description: book.description,
    image: `http://localhost:8000/storage/${book.image}`,
    stock: book.stok, // Tambahkan ini
  }}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>

    </div>
  );
};

export default BookDetail;
