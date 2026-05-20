"use client";

import { useEffect, useMemo, useState } from "react";

/* ================================
   Types
================================ */
interface User {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean; // fixed: should be boolean, not literal false
}

/* ================================
   Component
================================ */
export default function Home() {
  /* ================================
     State
  ================================= */
  const [users, setUsers] = useState<User[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  /* ================================
     Fetch Data (Side Effects)
  ================================= */
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch users and todos in parallel for better performance
        const [usersRes, todosRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/users"),
          fetch("https://jsonplaceholder.typicode.com/todos"),
        ]);

        // fetch() only throws on network errors, so we manually check responses
        if (!usersRes.ok || !todosRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const usersData: User[] = await usersRes.json();
        const todosData: Todo[] = await todosRes.json();

        setUsers(usersData);
        setTodos(todosData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  /* ================================
     Derived Data (Performance Optimization)
  ================================= */

  // Convert users array into a lookup map:
  // userId -> userName
  // This avoids using .find() repeatedly inside render
  const userMap = useMemo(() => {
    return users.reduce<Record<number, string>>((acc, user) => {
      acc[user.id] = user.name;
      return acc;
    }, {});
  }, [users]);

  // Filter + sort users (derived state, NOT stored in React state)
  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) =>
        sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      );
  }, [users, search, sortAsc]);

  /* ================================
     UI States (Early Returns)
  ================================= */
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  /* ================================
     Render
  ================================= */
  return (
    <div>
      <h2>Users</h2>

      {/* Search Input (Controlled Component)
          Every keystroke updates state → triggers re-render */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Toggle Sorting Direction */}
      <button onClick={() => setSortAsc((prev) => !prev)}>
        Sort: {sortAsc ? "A → Z" : "Z → A"}
      </button>

      <div className="space-y-4">
        {/* USERS LIST */}
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> — {user.email}
            </li>
          ))}
        </ul>

        {/* TODOS LIST */}
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="space-x-2">
              {/* Conditional styling based on completion status */}
              <span
                className={`${
                  todo.completed ? "line-through" : "font-semibold"
                }`}
              >
                {todo.title}
              </span>

              {/* JOINED DATA: userId → userName via lookup map */}
              <span>by: {userMap[todo.userId]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
