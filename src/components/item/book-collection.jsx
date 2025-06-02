import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { BookModal } from "@/components/item/book-modal";
import { Heart } from "lucide-react"; // atau gunakan ikon love sesuai library kamu

export function BookCollection({ books }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleFavorite = (bookId) => {
    setFavorites((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="font-serif mb-4 text-3xl font-light text-slate-800">
            Koleksi Buku Terbaru
          </h2>
          <div className="mx-auto h-[1px] w-24 bg-amber-300"></div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => openModal(book)}
              onFavorite={() => toggleFavorite(book.id)}
              isFavorite={favorites.includes(book.id)}
            />
          ))}
        </div>
      </div>
      <BookModal book={selectedBook} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
}

function BookCard({ book, onClick, onFavorite, isFavorite }) {
  return (
    <Card
      className="group overflow-hidden rounded-xl border-none transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl shadow-lg h-full relative"
    >
      {/* LOVE ICON */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // agar tidak membuka modal saat klik love
          onFavorite();
        }}
        className="absolute top-3 right-3 z-10 rounded-full bg-white/80 p-1 hover:bg-white"
        title="Tambah ke Favorit"
      >
        <Heart
          className={`w-5 h-5 ${isFavorite ? "fill-red-500 stroke-red-500" : "stroke-slate-400"}`}
        />
      </button>

      <div className="relative h-56 overflow-hidden cursor-pointer" onClick={onClick}>
        <img
          src={book.image || "/placeholder.svg"}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
      </div>
      <CardContent className="p-6 bg-white">
        <h3 className="font-serif mb-2 text-xl font-medium text-slate-800 line-clamp-1">
          {book.title}
        </h3>
        <p className="text-amber-600 text-sm">By {book.author}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-stone-100 bg-stone-50 px-6 py-3 text-sm text-slate-500 mt-auto">
        <span className="flex items-center">
          <span className="mr-1 text-amber-400">✍️</span> Penulis
        </span>
        <span className="flex items-center">
          <span className="mr-1 text-amber-400">📅</span> {book.year}
        </span>
      </CardFooter>
    </Card>
  );
}
