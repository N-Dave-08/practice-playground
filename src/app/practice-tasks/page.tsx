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

type CountMap = {
  [key: string]: number;
};

const count: CountMap = fruits.reduce(
  (acc: CountMap, fruit: string): CountMap => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
  },
  {},
);

console.log("count occurences", count);

export default function PracticeTask() {
  return <div>page</div>;
}
