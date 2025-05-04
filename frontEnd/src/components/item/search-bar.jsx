import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar({
  books,
  setFilteredBooks,
  setFilteredBooksTrending,
  setFilteredBooksComing,
}) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const lowercasedQuery = query.toLowerCase();
    const results = books.filter((book) =>
      book.title.toLowerCase().includes(lowercasedQuery) ||
      book.author.toLowerCase().includes(lowercasedQuery)
    );

    setFilteredBooks(results.filter((b) => b.type === "book"));
    setFilteredBooksTrending(results.filter((b) => b.type === "trending"));
    setFilteredBooksComing(results.filter((b) => b.type === "comingsoon"));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative mx-auto max-w-3xl w-full px-4 -mt-8 z-10">
      <div className="flex items-center bg-white rounded-xl shadow-xl overflow-hidden">
        <Input
          type="text"
          placeholder="Search for books, authors, or categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border-none text-base py-6 px-6 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button
          onClick={handleSearch}
          className="m-1 bg-amber-300 hover:bg-amber-400 text-slate-900 rounded-lg h-12 px-6"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
