export interface Repo {
    id: number;
    full_name: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    created_at: string;
    owner?: string;
    topics?: string[];
    language?: string;
    open_issues_count?: number;
    contributors_url?: string;
  }