export function Banner({ imageUrl }) {
    return (
      <div className="relative h-[500px] w-full overflow-hidden">
        <img
          src={imageUrl || "https://picsum.photos/1920/500?random=20"}
          alt="Banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-transparent">
          <div className="container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
              Discover Your Next <span className="text-amber-300">Favorite Book</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">
              Explore our vast collection of books from various genres and authors
            </p>
          </div>
        </div>
      </div>
    )
  }
  