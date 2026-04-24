import { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import type { FilterType } from './components/FilterBar';
import { FeedItem } from './components/FeedItem';
import { SourcesList } from './components/SourcesList';
import type { Article } from './data/mockData';

function App() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('Tous');
  const [savedItemIds, setSavedItemIds] = useState<Set<string>>(new Set());
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching articles:", err);
        setLoading(false);
      });
  }, []);

  const handleToggleSave = (id: string) => {
    setSavedItemIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const displayedArticles = useMemo(() => {
    switch (activeFilter) {
      case 'Publications':
        return articles.filter(item => item.type === 'Article');
      case 'Vidéos':
        return articles.filter(item => item.type === 'Vidéo');
      case 'Archives':
        return articles.filter(item => savedItemIds.has(item.id));
      case 'Tous':
      default:
        return articles;
    }
  }, [activeFilter, savedItemIds, articles]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center w-full max-w-7xl mx-auto px-4 md:px-8">
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        
        <div className="w-full py-8">
          {activeFilter === 'Sources' ? (
            <SourcesList />
          ) : loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400 font-sans font-light">
              <p className="text-xl">Chargement des articles...</p>
            </div>
          ) : displayedArticles.length > 0 ? (
            <div className="flex flex-col">
              {displayedArticles.map((article, index) => (
                <FeedItem
                  key={article.id}
                  article={article}
                  index={index}
                  isSaved={savedItemIds.has(article.id)}
                  onToggleSave={handleToggleSave}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400 font-sans font-light">
              <p className="text-xl">Aucun article trouvé dans cette catégorie.</p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="w-full py-12 border-t border-gray-100 mt-12 text-center text-sm font-sans text-gray-400">
        &copy; {new Date().getFullYear()} The Watch Collector's Journal. Tous droits réservés.
      </footer>
    </div>
  );
}

export default App;
