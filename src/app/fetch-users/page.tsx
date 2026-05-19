"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");

        // 🔴 IMPORTANT INTERVIEW POINT:
        // fetch() does NOT automatically throw errors for HTTP failures like 404 or 500.
        // It only throws on network-level failures (like no internet).
        // So we manually check res.ok to properly handle API-level errors.
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data: User[] = await res.json();

        // We store the API result in state so React can re-render the UI.
        // This triggers a re-render of the component with updated user data.
        setUsers(data);
      } catch (err) {
        // 🔴 ERROR HANDLING STRATEGY:
        // We normalize unknown errors into a readable string so UI can display it.
        // This is better than just using a boolean because it allows debugging messages.
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        // 🔴 IMPORTANT:
        // finally ALWAYS runs (success or error).
        // This ensures loading state is turned off no matter what happens.
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  // 🔴 DERIVED DATA (IMPORTANT INTERVIEW CONCEPT):
  // We do NOT mutate original state (`users`).
  // Instead, we compute a transformed version for rendering.
  // This keeps state predictable and avoids side effects.

  const filteredUsers = users
    .filter((user) =>
      // Search is case-insensitive so user experience is more flexible
      user.name.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      // 🔴 SORTING EXPLANATION:
      // localeCompare is used instead of manual comparison because:
      // - It handles alphabetical sorting properly
      // - It supports different languages correctly
      // - It avoids edge-case bugs with string comparison

      return sortAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

  // 🔴 CONDITIONAL RENDERING FLOW:
  // We prioritize UI states in order:
  // 1. loading → show loading screen
  // 2. error → show error message
  // 3. success → show data
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Users</h2>

      {/* Controlled input:
          React controls the input value using state.
          Every keystroke updates state → triggers re-render → updates filtered list */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Toggle sort direction:
          We flip boolean state using previous value safely.
          This avoids stale state issues in React updates. */}
      <button onClick={() => setSortAsc((prev) => !prev)}>
        Sort: {sortAsc ? "A → Z" : "Z → A"}
      </button>

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
