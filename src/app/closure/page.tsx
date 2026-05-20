export default function Closure() {
  // A closure is when a function “remembers” variables from its outer scope, even after the outer function has finished executing.

  //   Examples:

  function outer() {
    let count = 0;

    function inner() {
      count++;
      console.log(count);
    }

    return inner;
  }

  const counter = outer();

  //   count is still remember after outer() finished executing
  counter();
  counter();
  counter();

  function bankAccount() {
    let balance = 100;

    return {
      // closure methods
      deposit(amount: number) {
        balance += amount;
        console.log("after deposit", balance);
      },
      //   closure methods
      widthraw(amount: number) {
        balance -= amount;
        console.log("after widthrawal", balance);
      },
    };
  }

  const account = bankAccount();

  //   balance is still "remembered" even after bankAccount() finish executing
  account.deposit(50);
  account.widthraw(20);

  // ================================================
  //   commont interview trap
  // ================================================

  function test() {
    let x = 10;

    setTimeout(function () {
      console.log(x);
    }, 1000);
  }

  //   Even after test() finishes, x is still accessible.
  test();

  // ================================================
  //   Loop + closure
  // ================================================

  //   var
  for (var i = 1; i <= 3; i++) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  }
  //   output would be 4, 4, 4 because var is function-scoped then all callbacks share the same i

  //   let
  for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
      debugger;
      console.log(i);
    }, 1000);
  }

  for (let i = 1; i <= 3; i++) {
    const log = () => {
      debugger;
      console.log(i);
    };
    setTimeout(log, 100);
  }

  return <div>page</div>;
}
