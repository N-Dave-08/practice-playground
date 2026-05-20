import React from "react";

export default function PromiseVSAsyncAwait() {
  // A Promise is an object that represents a value that will be available in the future.

  // Example:
  const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data Loaded");
    }, 1000);
  });

  fetchData.then((data) => {
    console.log(data);
  });

  function firstTask() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const firstTaskDone = true;

        if (firstTaskDone) {
          resolve("first task done!");
        } else {
          reject("first task failed");
        }
      }, 1500);
    });
  }

  function secondTask() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const secondTaskDone = true;

        if (secondTaskDone) {
          resolve("second task done!");
        } else {
          reject("second task failed");
        }
      }, 2000);
    });
  }

  // firstTask()
  //   .then((value) => {
  //     console.log(value);
  //     return secondTask().then((value) => {
  //       console.log(value);
  //     });
  //   })
  //   .catch((error) => console.error(error));

  // converted to async/await
  async function runTasks() {
    const firstTaskResult = await firstTask();
    console.log(firstTaskResult);

    const secondTaskResult = await secondTask();
    console.log(secondTaskResult);
  }

  runTasks();

  // Key idea
  // Promises use .then() and .catch() to handle async results.

  // async/await is syntactic sugar over Promises.

  function fetchData2() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Data Loaded 2");
      }, 1000);
    });
  }

  async function getData() {
    const result = await fetchData2();
    console.log(result);
  }

  getData();

  // Key idea

  // await pauses execution until the Promise resolves.

  // Promises are objects representing future values, handled using .then() and .catch(),
  // while async/await is syntactic sugar built on top of Promises that allows asynchronous code
  // to be written in a synchronous style, improving readability and maintainability.

  // ================================================
  //   Promise style
  // ================================================

  //   getUser()
  //     .then((user) => {
  //       return getPosts(user.id);
  //     })
  //     .then((posts) => {
  //       console.log(posts);
  //     });

  // ================================================
  //   async/await style
  // ================================================

  //   async function fetchPosts() {
  //     try {
  //       const user = await getUser();
  //       const posts = await getPosts(user.id);
  //       console.log(posts);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fetchPosts();

  return <div>page</div>;
}
