import React from "react";

export default function VarLetConst() {
  //   what is the difference between var, let, and const

  //   var is function-scoped and can be redeclared and reassigned. It is hoisted and initialized as undefined.
  //   let and const are block-scoped, meaning they are only accessible within the block they are defined in.
  //   let can be reassigned but not redeclared in the same scope, while const cannot be reassigned or redeclared.
  //   Unlike var, let and const are hoisted but not initialized, so accessing them before declaration causes a ReferenceError due to the temporal dead zone.

  //   Examples:

  // ================================================
  //   var
  // ================================================
  function demoVar() {
    if (true) {
      var x = 10;
    }

    // 10 is still accessible outsidde the if block
    console.log(x);
  }

  demoVar();

  //   var hoisting
  console.log("var a =", a);

  var a = 5;

  // ================================================
  //   let
  // ================================================

  //   function demoLet() {
  //     if (true) {
  //       let y = 20;
  //     }

  //     console.log(y);
  //   }

  //   demoLet();

  //   console.log(b);
  //   let b = 30;

  // ================================================
  //   re-assignment in objects are allowed
  // ================================================

  const user = {
    name: "Jacob",
  };

  user.name = "Alice";
  console.log(user.name);

  //   but this is not allowed because in this way, we are re-assigning
  //   user = {};

  // ================================================
  //   side-by-side comparison
  // ================================================

  console.log("========== side-by-side comparison ==========");
  function test() {
    var a = 1;
    let b = 2;
    const c = 3;

    if (true) {
      //   different block scope
      let b = 20;
      b = 21;

      //   different block scope
      const c = 30;

      //   a is accessible in this if block
      //   1, 21, 30
      console.log(a, b, c);
    }

    console.log(a);
    console.log(b);
    console.log(c);
  }

  test();

  console.log("========== complex examples ==========");

  var wizards = ["Merlin", "Gandalf", "Ursula", "Radagast"];
  var items = ["Spellbook", "Staff", "Urchins", "Pinecones"];

  /*
  var is function-scoped → ONLY ONE shared "item" variable exists

  Both loops reuse the same variable name:
  outer loop overwrites it
  inner loop overwrites it again
*/

  for (var item of wizards) {
    console.log(1, item);

    for (var item of items) {
      // inner loop overwrites the SAME "item"
    }

    console.log(2, item);
    // always becomes "Pinecones"
  }

  /*
========================
❌ FINAL OUTPUT
========================
1 Merlin
2 Pinecones

1 Gandalf
2 Pinecones

1 Ursula
2 Pinecones

1 Radagast
2 Pinecones
*/

  /*
========================
🧠 LOOP VISUALIZATION
========================

Outer: Merlin
   Inner: Spellbook
   Inner: Staff
   Inner: Urchins
   Inner: Pinecones

Outer: Gandalf
   Inner: Spellbook
   Inner: Staff
   Inner: Urchins
   Inner: Pinecones

Outer: Ursula
   Inner: Spellbook
   Inner: Staff
   Inner: Urchins
   Inner: Pinecones

Outer: Radagast
   Inner: Spellbook
   Inner: Staff
   Inner: Urchins
   Inner: Pinecones
*/

  var wizards = ["Merlin", "Gandalf", "Ursula", "Radagast"];
  var items = ["Spellbook", "Staff", "Urchins", "Pinecones"];

  /*
  let is BLOCK-scoped:
  → outer loop has its own "item"
  → inner loop has a separate "item"
  → no shared variable anymore
*/

  for (let wizard of wizards) {
    console.log(1, wizard);

    for (let item of items) {
      // completely separate variable from outer loop
    }

    console.log(2, wizard);
  }

  /*
========================
✅ CORRECT OUTPUT
========================
1 Merlin
2 Merlin

1 Gandalf
2 Gandalf

1 Ursula
2 Ursula

1 Radagast
2 Radagast
*/

  /*
========================
🧠 LOOP VISUALIZATION
========================

Outer: Merlin
   Inner: Spellbook
   Inner: Staff
   Inner: Urchins
   Inner: Pinecones
   → outer still = Merlin

Outer: Gandalf
   Inner: Spellbook
   Inner: Staff
   Inner: Urchins
   Inner: Pinecones
   → outer still = Gandalf

Outer: Ursula
   Inner: Spellbook
   Inner: Staff
   Inner: Urchins
   Inner: Pinecones
   → outer still = Ursula

Outer: Radagast
   Inner: Spellbook
   Inner: Staff
   Inner: Urchins
   Inner: Pinecones
   → outer still = Radagast
*/
  return <div>demo</div>;
}
