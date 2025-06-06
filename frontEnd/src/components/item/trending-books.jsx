import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { BookModal } from "@/components/item/book-modal";

export function TrendingBooks({ books }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleFavorite = (bookId, e) => {
    e.stopPropagation(); // supaya klik icon gak trigger buka modal
    setFavorites((prev) => {
      const newFav = new Set(prev);
      if (newFav.has(bookId)) {
        newFav.delete(bookId);
      } else {
        newFav.add(bookId);
      }
      return newFav;
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="font-serif text-3xl font-light text-slate-800 mb-2">
            Trending Books
          </h2>
          <div className="h-[1px] w-24 bg-amber-300 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => openModal(book)}
              isFavorite={favorites.has(book.id)}
              onToggleFavorite={(e) => toggleFavorite(book.id, e)}
            />
          ))}
        </div>
      </div>
      <BookModal book={selectedBook} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
}

function BookCard({ book, onClick, isFavorite, onToggleFavorite }) {
  return (
    <Card
      className="group relative overflow-hidden rounded-xl border-none transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl shadow-lg h-full cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={book.image || "/placeholder.svg"}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
        {/* Icon favorit (love) */}
        <button
          onClick={onToggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-3 right-3 z-10 rounded-full p-2 transition-colors ${
            isFavorite ? "bg-amber-300 text-red-600" : "bg-white text-gray-400 hover:text-red-600"
          }`}
        >
          {isFavorite ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </button>
      </div>
      <CardContent className="p-6 bg-white">
        <h3 className="font-serif mb-2 text-xl font-medium text-slate-800 line-clamp-1">
          {book.title}
        </h3>
        <p className="text-amber-600 text-sm">By {book.author}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-stone-100 bg-stone-50 px-6 py-3 text-sm text-slate-500 mt-auto">
        <span className="flex items-center">
          <span className="mr-1 text-amber-400">✍️</span> Author
        </span>
        <span className="flex items-center">
          <span className="mr-1 text-amber-400">📅</span> {book.year}
        </span>
      </CardFooter>
    </Card>
  );
}
