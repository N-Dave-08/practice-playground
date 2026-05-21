"use client";

import React from "react";

// ===============================
// User Type
// ===============================
type User = {
  id: number;
  name: string;
  role: string;
  active: boolean;
};

// ===============================
// Initial Data
// ===============================
let users: User[] = [
  { id: 1, name: "Alice", role: "admin", active: true },
  { id: 2, name: "Bob", role: "user", active: true },
  { id: 3, name: "Charlie", role: "user", active: false },
];

// ===============================
// CREATE - Add new user
// ===============================
function addUser(newUser: User): void {
  users.push(newUser);
}

// ===============================
// READ - Get all users
// ===============================
function getUsers(): User[] {
  return users;
}

// ===============================
// READ - Get user by ID
// ===============================
function getUserById(id: number): User | undefined {
  return users.find((user) => user.id === id);
}

// ===============================
// UPDATE - Update user by ID
// ===============================
function updateUser(id: number, updatedData: Partial<User>): void {
  users = users.map((user) =>
    user.id === id ? { ...user, ...updatedData } : user,
  );
}

// ===============================
// DELETE - Remove user by ID
// ===============================
function deleteUser(id: number): void {
  users = users.filter((user) => user.id !== id);
}

// ===============================
// DEMO USAGE
// ===============================

// CREATE
addUser({ id: 4, name: "Dave", role: "manager", active: true });

// READ
console.log("All users:", getUsers());
console.log("User by ID:", getUserById(2));

// UPDATE
updateUser(2, { name: "Bobby", active: false });

// DELETE
deleteUser(3);

console.log("Final users:", getUsers());

export default function page() {
  return <div>page</div>;
}
