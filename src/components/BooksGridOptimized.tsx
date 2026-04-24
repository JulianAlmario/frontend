import React, { useEffect, useState } from 'react';
import { useBooksStore } from '../stores/booksOptimized';


interface BooksGridProps {
  limit?: number;
  showFilters?: boolean;
}

const BooksGrid: React.FC<BooksGridProps> = ({ limit, showFilters = false }) => {
  const { books, loading, error, fetchBooks } = useBooksStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Fetch books only if we don't have them in store
    if (books.length === 0) {
      fetchBooks();
    }
  }, [books.length, fetchBooks]);

  // Filter books based on search and filters
  const filteredBooks = books
    .filter(book => {
      const matchesSearch = searchTerm === '' || 
        book.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genero.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGenre = selectedGenre === '' || book.genero === selectedGenre;
      const matchesAvailability = !showOnlyAvailable || book.disponible > 0;

      return matchesSearch && matchesGenre && matchesAvailability;
    })
    .slice(0, limit || books.length);

  const genres = [...new Set(books.map(book => book.genero))].sort();

  if (!isClient) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(limit || 6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-slate-800 rounded-xl h-64 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-800 rounded w-3/4"></div>
              <div className="h-3 bg-slate-800 rounded w-1/2"></div>
              <div className="h-3 bg-slate-800 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="text-gray-400">Cargando libros...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="glass-card p-8 max-w-md mx-auto">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => fetchBooks()}
            className="form-button px-4 py-2 rounded-lg"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {showFilters && (
        <div className="glass-card p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por título, autor o género..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-glass rounded-md w-full pl-12 pr-4 py-3"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="input-glass rounded-md px-4 py-3"
              >
                <option value="">Todos los géneros</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
              <button
                onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
                className={`px-4 py-3 rounded-md transition-colors ${
                  showOnlyAvailable 
                    ? 'bg-primary-500/30 text-primary-300' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Disponibles
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div key={book._id} className="book-card group hover:scale-105 transition-all duration-300">
            <div className="relative overflow-hidden rounded-xl mb-4">
              <img
                src={book.imagen || `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
                  `${book.genero} book cover ${book.titulo} ${book.autor}`
                )}&image_size=portrait_4_3`}
                alt={book.titulo}
                loading="lazy"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white group-hover:text-primary-300 transition-colors line-clamp-2">
                {book.titulo}
              </h3>
              <p className="text-gray-300 text-sm">{book.autor}</p>
              <p className="text-gray-400 text-xs">{book.editorial} • {book.fechaPublicacion}</p>
              
              <div className="flex items-center justify-between">
                <span className="bg-primary-500/20 text-primary-300 px-2 py-1 rounded-full text-xs font-medium">
                  {book.genero}
                </span>
                <div className="flex items-center space-x-1">
                  <svg className="text-yellow-400 fill-current w-4 h-4" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-white text-sm">4.5</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center space-x-2">
                  <svg className="text-green-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-green-400 text-xs">{book.disponible}/{book.cantidad}</span>
                </div>
                <button className="bg-gradient-to-r from-secondary-500 to-accent-500 hover:from-secondary-600 hover:to-accent-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105">
                  Reservar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <div className="glass-card p-8 max-w-md mx-auto">
            <p className="text-gray-300">No se encontraron libros que coincidan con tus criterios.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksGrid;