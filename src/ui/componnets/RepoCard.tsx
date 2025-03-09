import { predictGrowth } from '../../api/trendAnalysis';
import { Repo } from '../../types';
import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';

interface RepoCardProps {
  repo: Repo;
  onBookmark: (repo: Repo) => void;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, onBookmark }) => {
  const predictedStars = predictGrowth(repo.stargazers_count, repo.created_at);

  return (
    <div className="card">
      <h2 className="text-lg font-semibold">{repo.full_name}</h2>
      <p className="text-sm text-gray-400 mb-2">{repo.description || 'No description'}</p>
      <div className="flex gap-4 text-sm">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
      <p className="text-sm mt-2 text-vscode-accent">Predicted stars in 1 week: {predictedStars}</p>
      <VSCodeButton className="mt-4" onClick={() => onBookmark(repo)}>
        Bookmark
      </VSCodeButton>
    </div>
  );
};

export default RepoCard;