import RepoCard from './RepoCard';
import { Repo } from '../../types';

interface BookmarkListProps {
  bookmarks: Repo[];
}

const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Bookmarked Repositories</h2>
      {bookmarks.length === 0 ? (
        <p className="text-gray-400">No bookmarks yet.</p>
      ) : (
        <div className="grid gap-4">
          {bookmarks.map(repo => (
            <RepoCard key={repo.id} repo={repo} onBookmark={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkList;