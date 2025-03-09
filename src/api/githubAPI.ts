import { Repo } from '../types';

export async function fetchTrendingRepos(
  language: string = '',
  timeframe: 'daily' | 'weekly' | 'monthly' = 'weekly'
): Promise<Repo[]> {
  const now = new Date();
  let since: string;
  if (timeframe === 'daily') {
    since = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  } else if (timeframe === 'weekly') {
    since = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  } else {
    since = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  }

  const query = `${since ? `created:>${since}` : ''} stars:>100 ${language ? `language:${language}` : ''}`;
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=10`;

  const response = await fetch(url, {
    headers: { Accept: 'application/vnd.github.v3+json' }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch trending repos: ${response.statusText}`);
  }
  const data = await response.json();
  return data.items.map((item: any) => ({
    id: item.id,
    full_name: item.full_name,
    description: item.description,
    stargazers_count: item.stargazers_count,
    forks_count: item.forks_count,
    updated_at: item.updated_at,
    created_at: item.created_at,
  }));
}

export async function fetchRepoDetails(owner: string, repo: string): Promise<Repo> {
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  const response = await fetch(url, {
    headers: { Accept: 'application/vnd.github.v3+json' }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch repo details: ${response.statusText}`);
  }
  const data = await response.json();
  return {
    id: data.id,
    full_name: data.full_name,
    description: data.description,
    stargazers_count: data.stargazers_count,
    forks_count: data.forks_count,
    updated_at: data.updated_at,
    created_at: data.created_at,
    owner: data.owner.login,
    topics: data.topics,
    language: data.language,
    open_issues_count: data.open_issues_count,
    contributors_url: data.contributors_url,
  };
}