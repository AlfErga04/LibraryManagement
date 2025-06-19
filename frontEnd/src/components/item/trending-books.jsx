import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { BookModal } from "@/components/item/book-modal";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export function TrendingBooks({ books }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="font-serif text-3xl font-light text-slate-800 mb-2">
            Trending Books
          </h2>
          <div className="h-[1px] w-24 bg-amber-300"></div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onClick={() => openModal(book)} />
          ))}
        </div>
      </div>
      {isModalOpen && selectedBook && (
        <BookModal book={selectedBook} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </section>
  );
}

function BookCard({ book, onClick }) {
  const [isFavorited, setIsFavorited] = useState(book.is_favorited || false);

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/api/favorites/toggle/${book.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setIsFavorited((prev) => !prev);
      } else {
        const errorData = await response.json();
        console.error("Gagal toggle favorit:", errorData.message || response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <Card
      className="group overflow-hidden rounded-xl border-none transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl shadow-lg h-full relative cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={book.image ? `http://localhost:8000/storage/${book.image}` : "/placeholder.svg"}
          alt={book.judul}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

        {/* Ikon Love */}
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={toggleFavorite}
            className="text-white text-xl bg-black/40 rounded-full p-2 hover:bg-red-500 transition"
            title={isFavorited ? "Hapus dari favorit" : "Tambahkan ke favorit"}
          >
            {isFavorited ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          </button>
        </div>
      </div>

      <CardContent className="p-6 bg-white">
        <h3 className="font-serif mb-2 text-xl font-medium text-slate-800 line-clamp-1">
          {book.judul}
        </h3>
        <p className="text-amber-600 text-sm">{book.penulis || "Tanpa Penulis"}</p>
      </CardContent>

      <CardFooter className="flex justify-between border-t border-stone-100 bg-stone-50 px-6 py-3 text-sm text-slate-500 mt-auto">
        <span>{book.category || "Tanpa Kategori"}</span>
        <span>{book.jumlah_peminjaman}x dipinjam</span>
      </CardFooter>
    </Card>
  );
}
