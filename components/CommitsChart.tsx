'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format, subDays } from 'date-fns';

interface CommitsChartProps {
  username: string;
}

interface CommitData {
  date: string;
  commits: number;
}

export function CommitsChart({ username }: CommitsChartProps) {
  const [commitData, setCommitData] = useState<CommitData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommitData = async () => {
      setLoading(true);
      setError(null);
      try {
        // GitHub API v3 endpoint for user events
        const response = await fetch(`https://api.github.com/users/${username}/events`);
        if (!response.ok) {
          throw new Error('Failed to fetch commit data');
        }
        const events = await response.json();
        
        // Process push events to get commit counts
        const commitsByDate = new Map<string, number>();
        const today = new Date();
        
        // Initialize last 30 days with 0 commits
        for (let i = 0; i < 30; i++) {
          const date = format(subDays(today, i), 'yyyy-MM-dd');
          commitsByDate.set(date, 0);
        }

        // Count commits from push events
        events.forEach((event: any) => {
          if (event.type === 'PushEvent') {
            const date = format(new Date(event.created_at), 'yyyy-MM-dd');
            if (commitsByDate.has(date)) {
              commitsByDate.set(date, (commitsByDate.get(date) || 0) + event.payload.size);
            }
          }
        });

        // Convert to array format for Recharts
        const chartData = Array.from(commitsByDate.entries())
          .map(([date, commits]) => ({ date, commits }))
          .reverse();

        setCommitData(chartData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCommitData();
  }, [username]);

  if (loading) return <div>Loading commit data...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Commit Activity (Last 30 Days)</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={commitData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(new Date(date), 'MMM d')}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
            />
            <Line
              type="monotone"
              dataKey="commits"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}