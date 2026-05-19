import React from "react";

export default function EventLoop() {
  // The event loop is how JavaScript handles asynchronous code even though it is single-threaded.
  // The event loop manages when async code (like setTimeout, promises, fetch) gets executed after synchronous code finishes.
  // Simple term: JavaScript can only do one thing at a time, so the event loop decides what code runs next when async tasks are waiting.

  // Mental model:
  // JavaScript runs sync code first, then microtasks (Promises), then macrotasks (setTimeout), using the event loop to control execution order.

  // Examples:

  console.log("A");

  setTimeout(() => {
    console.log("B");
  }, 0);

  console.log("C");

  // ================================================
  //   Promises vs setTimeout
  // ================================================

  console.log("1");

  setTimeout(() => {
    console.log("2");
  }, 0);

  Promise.resolve().then(() => {
    console.log("3");
  });

  console.log("4");

  //   Order:
  //    Sync first:
  //        1
  //        4
  //    Microtask queue (Promise):
  //        3
  //    Macrotask queue (setTimeout):
  //        2
  //   Promises run BEFORE setTimeout, even if both are "0ms"

  //   The event loop allows JavaScript to handle asynchronous operations
  //   by moving tasks between the call stack, Web APIs, and task queues.
  //   After synchronous code runs, microtasks like Promises are executed
  //   first, followed by macrotasks like setTimeout.

  return <div>Event Loop</div>;
}
