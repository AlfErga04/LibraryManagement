import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function BookCollection({ books }) {
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
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BookCard({ book }) {
  return (
    <Card className="group overflow-hidden rounded-xl border-none transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl shadow-lg">
      <div className="relative h-72 overflow-hidden">
        <img
          src={book.image || "/placeholder.svg"}
          alt={book.title}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent opacity-1 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full transition-transform duration-500 group-hover:translate-y-0">
          <p className="text-sm font-light line-clamp-3">{book.description}</p>
        </div>
      </div>
      <CardContent className="p-6 bg-white">
        <h3 className="font-serif mb-2 text-xl font-medium text-slate-800 line-clamp-1">
          {book.title}
        </h3>
        <p className="text-amber-600 text-sm">{book.author}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-stone-100 bg-stone-50 px-6 py-3 text-sm text-slate-500">
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
