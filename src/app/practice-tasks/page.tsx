"use client";

// ================================================
//   Filter + Sort
// ================================================
type User = {
  name: string;
  active: boolean;
};

const users: User[] = [
  { name: "Zoe", active: true },
  { name: "Alex", active: false },
  { name: "John", active: true },
];

const result: User[] = users
  .filter((user) => user.active)
  .sort((a, b) => a.name.localeCompare(b.name));

console.log("filter + sort", result);

// ================================================
//   Grouping data
// ================================================
type UserB = {
  name: string;
  role: "admin" | "user";
};

const usersB: UserB[] = [
  {
    name: "A",
    role: "admin",
  },
  {
    name: "B",
    role: "user",
  },
  {
    name: "C",
    role: "admin",
  },
];

// This type describes an object where:
// - keys are dynamic strings (like "admin", "user", etc.)
// - values are arrays of UserB
type GroupedUsers = {
  [key: string]: UserB[];
};

const grouped: GroupedUsers = usersB.reduce(
  (acc: GroupedUsers, user: UserB) => {
    // Check if this role already exists as a key in the accumulator
    if (!acc[user.role]) {
      // If it doesn't exist yet, initialize it as an empty array
      acc[user.role] = [];
    }

    // Push the current user into the correct role group
    acc[user.role].push(user);

    // Always return the accumulator for the next iteration
    return acc;
  },
  {}, // Start with an empty object as the initial accumulator
);

console.log("grouped", grouped);

// ================================================
//   Count occurrences
// ================================================
const fruits: string[] = ["apple", "banana", "apple", "orange", "banana"];

// This type means:
// "An object where each key is a string (fruit name),
// and each value is a number (count of occurrences)"
type CountMap = {
  [key: string]: number;
};

const count: CountMap = fruits.reduce(
  (acc: CountMap, fruit: string): CountMap => {
    // acc = the object we are building step by step

    // If this fruit already exists in acc, use its value
    // If not, start from 0
    //
    // Example:
    // acc["apple"] = 1 → next apple becomes 2
    // acc["banana"] = undefined → treat as 0
    acc[fruit] = (acc[fruit] || 0) + 1;

    // Return updated accumulator for next loop iteration
    return acc;
  },
  {}, // Start with an empty object
);

console.log("count occurrences", count);

// ================================================
//   Task 1
// ================================================

// 🧩 Problem:

// You are given an array of users from an API.

// Your task is to:

// ✅ 1. Filter only active users
// ✅ 2. Return only their emails
// ✅ 3. Group emails by domain (gmail.com, yahoo.com, etc.)

{
  type User = {
    id: number;
    name: string;
    email: string;
    active: boolean;
  };

  const users: User[] = [
    { id: 1, name: "A", email: "a@gmail.com", active: true },
    { id: 2, name: "B", email: "b@yahoo.com", active: false },
    { id: 3, name: "C", email: "c@gmail.com", active: true },
    { id: 4, name: "D", email: "d@outlook.com", active: true },
    { id: 5, name: "E", email: "e@yahoo.com", active: true },
  ];

  const filteredUsers = users
    .filter((user: User) => user.active)
    .reduce((acc: Record<string, string[]>, user: User) => {
      // extract domain from email
      const domain = user.email.split("@")[1];

      // initialize array if not exists
      if (!acc[domain]) {
        acc[domain] = [];
      }

      // push email into correct domain group
      acc[domain].push(user.email);

      return acc;
    }, {});

  console.log(filteredUsers);
}

// ================================================
//   Task 2
// ================================================

// 🧩 Problem:

// This function is supposed to:

// Group active users by role and return an object like:

// {
//   admin: ["Alice"],
//   user: ["Bob"]
// }

// But it is currently broken.

{
  type User = {
    name: string;
    role: string;
    active: boolean;
  };

  const users: User[] = [
    { name: "Alice", role: "admin", active: true },
    { name: "Bob", role: "user", active: true },
    { name: "Charlie", role: "user", active: false },
  ];

  function groupUsers(users: User[]) {
    return users.reduce((acc: Record<string, string[]>, user: User) => {
      if (!user.active) return acc;

      if (!acc[user.role]) {
        acc[user.role] = [];
      }

      acc[user.role].push(user.name);

      return acc;
    }, {});
  }

  console.log(groupUsers(users));
}

export default function PracticeTask() {
  return <div>page</div>;
}
