import { useState } from "react";
import { Banner } from "@/components/item/banner";
import { BookCollection } from "@/components/item/book-collection";
import { ComingSoonBooks } from "@/components/item/coming-soon-books";
import { HeroSection } from "@/components/item/hero-section";
import { HighlightSection } from "@/components/item/highlight-section";
import { SearchBar } from "@/components/item/search-bar";
import { TrendingBooks } from "@/components/item/trending-books";

import trendingBooks from "@/components/Booklist/trending";
import comingSoonBooks from "@/components/Booklist/comingsoon";
import books from "@/components/Book/books";

const Home = () => {
  const trendingBooksWithType = trendingBooks.map((book) => ({
    ...book,
    type: "trending",
  }));
  const comingSoonBooksWithType = comingSoonBooks.map((book) => ({
    ...book,
    type: "comingsoon",
  }));
  const booksWithType = books.map((book) => ({
    ...book,
    type: "book",
  }));

  const allBooks = [
    ...booksWithType,
    ...trendingBooksWithType,
    ...comingSoonBooksWithType,
  ];

  const [filteredBooks, setFilteredBooks] = useState(booksWithType);
  const [filteredBooksTrending, setFilteredBooksTrending] = useState(trendingBooksWithType);
  const [filteredBooksComing, setFilteredBooksComing] = useState(comingSoonBooksWithType);

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
