// ================================================
//   Interfaces
// ================================================

// Interfaces are mainly used for:
// - Object structures
// - OOP-style contracts
// - Classes
// - Extending structures
// - Declaration merging

interface Point2D {
  x: number;
  y: number;
}

// interface uses "extends"
interface Point3D extends Point2D {
  z: number;
}

const point: Point3D = {
  x: 0,
  y: 0,
  z: 0,
};

// classes can implement interfaces
class Example implements Point3D {
  x = 0;
  y = 0;
  z = 0;
}

// ================================================
//   Interface Declaration Merging
// ================================================

// interfaces with the same name automatically merge

interface Drink {
  name: string;
}

interface Drink {
  flavor: string;
}

const coffee: Drink = {
  name: "Coffee",
  flavor: "Vanilla",
};

// final merged interface:
//
// interface Drink {
//   name: string;
//   flavor: string;
// }

// ================================================
//   Types
// ================================================

// Types are more flexible than interfaces.
// They can represent:
// - Objects
// - Unions
// - Primitives
// - Functions
// - Tuples
// - Advanced type logic

type Geo2D = {
  x: number;
  y: number;
};

// type uses "&" intersection
type Geo3D = Geo2D & {
  z: number;
};

const geo: Geo3D = {
  x: 0,
  y: 0,
  z: 0,
};

// classes can also implement types
class ExampleB implements Geo3D {
  x = 0;
  y = 0;
  z = 0;
}

// ================================================
//   Key Differences
// ================================================

// ================================================
//   TYPES
// ================================================

// --------------------------------
// Unions
// --------------------------------

// types can create unions

type Status = "loading" | "success" | "error";

let currentStatus: Status;

currentStatus = "loading";
currentStatus = "success";
// currentStatus = "pending"; ❌ invalid

// another union example

type ID = string | number;

let userId: ID;

userId = 1;
userId = "abc123";

// interfaces cannot directly create unions

// --------------------------------
// Primitive Aliases
// --------------------------------

// types can alias primitives

type Name = string;
type Age = number;

const username: Name = "Dave";
const userAge: Age = 22;

// interfaces cannot do this

// interface Username = string ❌

// --------------------------------
// Shorthand Functions
// --------------------------------

// types are cleaner for functions

type Add = (a: number, b: number) => number;

const add: Add = (a, b) => {
  return a + b;
};

// interface version (more verbose)

interface AddFn {
  (a: number, b: number): number;
}

// --------------------------------
// Advanced Type Functions
// --------------------------------

// conditional type

type IsString<T> = T extends string ? true : false;

type TestA = IsString<string>; // true
type TestB = IsString<number>; // false

// mapped type

type PartialUser<T> = {
  [K in keyof T]?: T[K];
};

type User = {
  name: string;
  age: number;
};

type OptionalUser = PartialUser<User>;

// result:
//
// {
//   name?: string;
//   age?: number;
// }

// utility types like Partial<T>, Pick<T>, Readonly<T>
// are powered by mapped types

// ================================================
//   INTERFACES
// ================================================

// --------------------------------
// Familiarity with OOP / extends
// --------------------------------

// interfaces feel natural in OOP-style code

interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

const dog: Dog = {
  name: "Buddy",
  breed: "Golden Retriever",
};

class PetDog implements Dog {
  name = "Buddy";
  breed = "Golden Retriever";
}

// ================================================
//   QUICK SUMMARY
// ================================================

// interface
// - better for object contracts
// - common in OOP/class-based code
// - supports declaration merging
// - uses extends
// - cleaner for scalable APIs

// type
// - more flexible
// - supports unions
// - supports primitives
// - supports advanced type logic
// - better for React and utility types
// - uses & intersections

export default function TypesVSInterfaces() {
  return <div>page</div>;
}
