import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useState } from "react"
import { BookModal } from "@/components/item/book-modal"

export function ComingSoonBooks({ books }) {
  const [selectedBook, setSelectedBook] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (book) => {
    setSelectedBook(book)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section className="py-16 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="font-serif text-3xl font-light text-slate-800 mb-2">Coming Soon</h2>
          <div className="h-[1px] w-24 bg-amber-300"></div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onClick={() => openModal(book)} />
          ))}
        </div>
      </div>
      <BookModal book={selectedBook} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
}

function BookCard({ book, onClick }) {
  return (
    <Card className="group overflow-hidden rounded-xl border-none transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl shadow-lg h-full" onClick={onClick}>
      <div className="relative h-56 overflow-hidden">
        <img
          src={`http://localhost:8000/storage/${book.image}` || "/placeholder.svg"}
          alt={book.judul}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
      </div>

      <CardContent className="p-6 bg-white">
        <h3 className="font-serif mb-2 text-xl font-medium text-slate-800 line-clamp-1">
          {book.judul}
        </h3>
        <p className="text-amber-600 text-sm">{book.penulis}</p>
      </CardContent>

      <CardFooter className="flex justify-between border-t border-stone-100 bg-stone-50 px-6 py-3 text-sm text-slate-500 mt-auto">
        <span className="flex items-center">
          <span className="mr-1 text-amber-400"></span> {book.category}
        </span>
        <span className="flex items-center">
          <span className="mr-1 text-amber-400"></span> stok: {book.stok}
        </span>
      </CardFooter>
    </Card>
  )
}
