import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-slate-800 to-slate-900 py-28 text-white">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] bg-cover bg-center opacity-5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(64,78,107,0.5),transparent_70%)]"></div>
      <div className="container relative mx-auto px-4 text-center">
        <h1 className="font-serif mb-6 text-4xl font-light tracking-tight sm:text-5xl md:text-6xl">
          Selamat Datang di <span className="font-medium text-amber-300">Repository.io</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg font-light text-slate-300 sm:text-xl">
          Temukan, baca, dan tambahkan koleksi buku otomotif terbaik dari berbagai penulis Indonesia!
        </p>
        <Link to="/book">
          <Button
            size="lg"
            className="group bg-amber-300 text-slate-900 hover:bg-amber-200 border-none shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <BookOpen className="mr-2 h-5 w-5 transition-transform group-hover:rotate-[-8deg]" />
            Lihat Koleksi Buku
          </Button>
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-50 to-transparent"></div>
    </section>
  );
}
