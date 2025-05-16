import { Book, Users, Zap } from "lucide-react"

export function HighlightSection({ booksCount }) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <HighlightCard
            icon={<Book className="h-10 w-10 text-amber-400" />}
            value={`${booksCount}+`}
            label="Koleksi Buku Otomotif"
          />
          <HighlightCard icon={<Users className="h-10 w-10 text-amber-400" />} value="10+" label="Penulis Terpercaya" />
          <HighlightCard
            icon={<Zap className="h-10 w-10 text-amber-400" />}
            value="Update 2025"
            label="Konten Terbaru & Relevan"
          />
        </div>
      </div>
    </section>
  )
}

function HighlightCard({ icon, value, label }) {
  return (
    <div className="group flex flex-col items-center rounded-xl bg-white p-10 shadow-sm transition-all duration-300 hover:shadow-xl border border-stone-100">
      <div className="mb-5 rounded-full bg-amber-50 p-5 transition-transform duration-300 group-hover:scale-110 group-hover:bg-amber-100">
        {icon}
      </div>
      <h2 className="font-serif mb-2 text-3xl font-light text-slate-800">{value}</h2>
      <p className="text-center text-slate-500">{label}</p>
    </div>
  )
}
