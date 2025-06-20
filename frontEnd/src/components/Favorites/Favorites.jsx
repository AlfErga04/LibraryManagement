import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BookModal } from "@/components/item/book-modal";
import { FaTrash } from "react-icons/fa";

function Favorites() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8000/api/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data favorit");
      }

      const data = await response.json();
      const mapped = data.map((item) => ({
        id: item.id,
        judul: item.title,
        penulis: item.author,
        tahun_terbit: item.year,
        image: item.image,
        description: item.description,
      }));

      setFavoriteBooks(mapped);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromFavorites = async (e, bookId) => {
    e.stopPropagation(); // supaya modal tidak terbuka
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/api/favorites/toggle/${bookId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setFavoriteBooks((prev) => prev.filter((book) => book.id !== bookId));
      } else {
        const err = await response.json();
        console.error("Gagal hapus dari favorit:", err.message || response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const openModal = (book) => setSelectedBook(book);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="font-serif mb-4 text-3xl font-light text-slate-800">
            Buku Favorit Saya
          </h2>
          <div className="mx-auto h-[1px] w-24 bg-amber-300"></div>
        </div>

        {loading && (
          <p className="text-center text-gray-500">Memuat data buku favorit...</p>
        )}

        {favoriteBooks.length === 0 ? (
          <p className="text-center text-slate-500">Belum ada buku favorit.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => openModal(book)}
                onDelete={(e) => handleRemoveFromFavorites(e, book.id)}
              />
            ))}
          </div>
        )}

        <BookModal
          book={selectedBook}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </section>
  );
}

function BookCard({ book, onClick, onDelete }) {
  return (
    <Card
      className="group overflow-hidden rounded-xl border-none transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl shadow-lg h-full relative cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={book.image || "/placeholder.svg"}
          alt={book.judul}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

        {/* Tombol hapus favorit */}
        <button
          onClick={onDelete}
          className="absolute top-2 right-2 text-white text-xl bg-black/40 rounded-full p-2 hover:bg-red-600 transition"
          title="Hapus dari favorit"
        >
          <FaTrash />
        </button>
      </div>

      <CardContent className="p-6 bg-white">
        <h3 className="font-serif mb-2 text-xl font-medium text-slate-800 line-clamp-1">
          {book.judul}
        </h3>
        <p className="text-amber-600 text-sm">By {book.penulis}</p>
      </CardContent>

      <CardFooter className="flex justify-between border-t border-stone-100 bg-stone-50 px-6 py-3 text-sm text-slate-500 mt-auto">
        <span className="flex items-center">
          <span className="mr-1 text-amber-400">✍️</span> {book.penulis}
        </span>
        <span className="flex items-center">
          <span className="mr-1 text-amber-400">📅</span> {book.tahun_terbit}
        </span>
      </CardFooter>
    </Card>
  );
}

export default Favorites;
