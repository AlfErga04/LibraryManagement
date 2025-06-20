import { useEffect, useState } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

import { Banner } from "@/components/item/banner";
import { BookCollection } from "@/components/item/book-collection";
import { ComingSoonBooks } from "@/components/item/coming-soon-books";
import { HeroSection } from "@/components/item/hero-section";
import { HighlightSection } from "@/components/item/highlight-section";
import { SearchBar } from "@/components/item/search-bar";
import { TrendingBooks } from "@/components/item/trending-books";

const Home = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filteredBooksTrending, setFilteredBooksTrending] = useState([]);
  const [filteredBooksComing, setFilteredBooksComing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get("http://localhost:8000/api/book");
        const books = res1.data.data;

        const comingSoonBooks = books.filter((b) => b.stok === 0);
        const availableBooks = books.filter((b) => b.stok > 0);

        setAllBooks(books);
        setFilteredBooks(availableBooks);
        setFilteredBooksComing(comingSoonBooks);

        const res2 = await axios.get("http://localhost:8000/api/book/trending");
        setFilteredBooksTrending(res2.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-stone-50">
        <HashLoader color="#0854ff" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      <Banner />
      <SearchBar
        books={allBooks}
        setFilteredBooks={setFilteredBooks}
        setFilteredBooksTrending={setFilteredBooksTrending}
        setFilteredBooksComing={setFilteredBooksComing}
      />
      <HeroSection />
      <HighlightSection booksCount={filteredBooks.length} />
      <TrendingBooks books={filteredBooksTrending} />
      <ComingSoonBooks books={filteredBooksComing} />
      <BookCollection books={filteredBooks} />
    </main>
  );
};

export default Home;
