import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { fetchTrendingRepos } from '../api/githubAPI';
import RepoCard from './componnets/RepoCard';
import FilterBar from './componnets/FilterBar';
import BookmarkList from './componnets/BookmarkList';
import { Repo } from '../types';
import { provideVSCodeDesignSystem } from '@vscode/webview-ui-toolkit';
import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';

provideVSCodeDesignSystem().register();

const App: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [bookmarks, setBookmarks] = useState<Repo[]>([]);
  const [language, setLanguage] = useState<string>('');
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [tab, setTab] = useState<'trending' | 'bookmarks'>('trending');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchTrendingRepos(language, timeframe)
      .then(data => {
        setRepos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLoading(false);
      });

    // Request bookmarks from extension
    window.vscode.postMessage({ command: 'getBookmarks' });
  }, [language, timeframe]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (message.command === 'bookmarks') {
        setBookmarks(message.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const bookmarkRepo = (repo: Repo) => {
    window.vscode.postMessage({ command: 'addBookmark', repo });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Trending Repositories Tracker</h1>
      <FilterBar setLanguage={setLanguage} setTimeframe={setTimeframe} />
      <div className="flex gap-4 mb-6">
        <VSCodeButton onClick={() => setTab('trending')} appearance={tab === 'trending' ? 'primary' : 'secondary'}>
          Trending
        </VSCodeButton>
        <VSCodeButton onClick={() => setTab('bookmarks')} appearance={tab === 'bookmarks' ? 'primary' : 'secondary'}>
          Bookmarks
        </VSCodeButton>
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : tab === 'trending' ? (
        <div className="grid gap-4">
          {repos.length ? repos.map(repo => (
            <RepoCard key={repo.id} repo={repo} onBookmark={bookmarkRepo} />
          )) : <p>No trending repositories found.</p>}
        </div>
      ) : (
        <BookmarkList bookmarks={bookmarks} />
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
