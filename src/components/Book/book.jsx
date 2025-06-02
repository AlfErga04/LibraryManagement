import { useState } from "react";
import { BookModal } from "@/components/item/book-modal";
import initialBooks from "./books";

export default function Book() {
  const [books] = useState(initialBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResetSearch = () => {
    setSearchTerm("");
  };

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
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelectedBook(book)}
            >
              <img
                src={book.image}
                alt={book.title}
                className="h-64 w-full object-cover"
              />
              <div className="p-4">
                <h5 className="text-xl font-semibold mb-2">{book.title}</h5>
                <p className="text-sm text-gray-600 line-clamp-3">{book.description}</p>
              </div>
              <div className="bg-gray-100 text-gray-500 text-sm px-4 py-2">
                {book.author} - {book.year}
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
