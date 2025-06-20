import { useState, useEffect } from "react";
import axios from "axios";
import { BookModal } from "@/components/item/book-modal";
import HashLoader from "react-spinners/HashLoader";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Book() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/book");
      const data = response.data.data.map((book) => ({
        ...book,
        isFavorited: book.is_favorited || false,
      }));
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (e, bookId) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:8000/api/favorites/toggle/${bookId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === bookId
              ? { ...book, isFavorited: !book.isFavorited }
              : book
          )
        );
      } else {
        const err = await response.json();
        console.error("Gagal toggle favorit:", err.message || response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const filteredBooks = books.filter((book) =>
    (book.judul || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResetSearch = () => {
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-stone-50">
        <HashLoader color="#0854ff" />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-12 px-4">
      <h2 className="text-center text-3xl font-serif mb-8">📚 Daftar Buku</h2>

      {/* Pencarian */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            className="flex-1 rounded-lg border px-4 py-2 shadow-sm text-lg"
            placeholder="🔍 Cari buku berdasarkan judul..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 disabled:opacity-50 w-full md:w-auto"
            onClick={handleResetSearch}
            disabled={!searchTerm}
          >
            Reset Pencarian
          </button>
        </div>
      </div>

      {/* Grid Buku */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer relative"
              onClick={() => setSelectedBook(book)}
            >
              <img
                src={book.image ? `http://localhost:8000/storage/${book.image}` : "/placeholder.svg"}
                alt={book.judul}
                className="h-64 w-full object-cover"
              />

              {/* Favorite Icon */}
              <button
                onClick={(e) => toggleFavorite(e, book.id)}
                className="absolute top-2 right-2 text-white text-xl bg-black/40 rounded-full p-2 hover:bg-red-500 transition"
                title={book.isFavorited ? "Hapus dari favorit" : "Tambahkan ke favorit"}
              >
                {book.isFavorited ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              </button>

              <div className="p-4">
                <h5 className="text-xl font-semibold mb-2">{book.judul}</h5>
                <p className="text-sm text-gray-600 line-clamp-3">{book.description}</p>
              </div>
              <div className="bg-gray-100 text-gray-500 text-sm px-4 py-2">
                {book.penulis} - {new Date(book.tahun_terbit).getFullYear()}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            Tidak ada buku yang cocok dengan pencarian.
          </p>
        )}
      </div>

      {/* Modal Detail Buku */}
      <BookModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </div>
  );
}
