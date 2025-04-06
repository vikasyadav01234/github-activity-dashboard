'use client';

import { useState } from 'react';
import { Card } from '/components/ui/card';
import { Input } from '/components/ui/input';
import { Button } from '/components/ui/button';
import { UserRepositories } from '/components/UserRepositories';
import { CommitsChart } from '/components/CommitsChart';
import { useToast } from '/components/ui/use-toast';

export default function Home() {
  const [username, setUsername] = useState('');
  const [searchedUser, setSearchedUser] = useState('');
  const { toast } = useToast();

  const handleSearch = () => {
    if (!username) {
      toast({
        title: 'Error',
        description: 'Please enter a GitHub username',
        variant: 'destructive',
      });
      return;
    }
    setSearchedUser(username);
  };

  return (
    <main className="container mx-auto p-4">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">GitHub Activity Dashboard</h1>
        <div className="flex gap-4 mb-8">
          <Input
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="max-w-xs"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>

        {searchedUser && (
          <div className="space-y-8">
            <UserRepositories username={searchedUser} />
            <CommitsChart username={searchedUser} />
          </div>
        )}
      </Card>
    </main>
  );
}