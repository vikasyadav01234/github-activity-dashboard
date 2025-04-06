'use client';

import { useEffect, useState } from 'react';
import { Card } from '/components/ui/card';
import { ScrollArea } from '/components/ui/scroll-area';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
}

interface UserRepositoriesProps {
  username: string;
}

export function UserRepositories({ username }: UserRepositoriesProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        setRepositories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [username]);

  if (loading) return <div>Loading repositories...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Repositories</h2>
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {repositories.map((repo) => (
            <Card key={repo.id} className="p-4">
              <h3 className="font-medium">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {repo.name}
                </a>
              </h3>
              {repo.description && <p className="text-sm text-gray-600 mt-1">{repo.description}</p>}
              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                <span>⭐ {repo.stargazers_count}</span>
                {repo.language && <span>🔠 {repo.language}</span>}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}