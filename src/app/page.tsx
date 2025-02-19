'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface User {
  username: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  const addUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) return alert('Please enter a username.');

    try {
      const response = await axios.post('/api/users', { username });

      setUsers([...users, response.data.user]);

      setUsername('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">User List</h1>

      <form onSubmit={addUser} className="bg-gray-800 p-4 rounded-lg shadow-lg w-80 mb-6">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-500 p-2 rounded font-bold hover:bg-blue-600">
          Add User
        </button>
      </form>

      <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-3">Users:</h2>
        {users.length === 0 ? (
          <p className="text-gray-400">No users yet...</p>
        ) : (
          users.map((user, i) => (
            <div key={i} className="bg-gray-700 p-2 rounded mb-2">
              <p className="font-semibold">{user.username}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
