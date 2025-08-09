import "reflect-metadata";

// type Constructor = new (...args:any[]) => {}

// function Logger(constructor: Constructor){

// }
const ControllerKey = Symbol("Controller");

// function Logger(message: string) {
//   return function Logger(constructor: Function) {
//     console.log(message);
//     console.log(`Decorator called for ${constructor.name}`);
//   };
// }
function Constructor(basePath: string = "") {
  return function (constructor: Function) {
    Reflect.defineMetadata(ControllerKey, basePath, constructor);
  };
}

@Constructor("/Hellos")
export class TestUser {
  constructor(private name: string, private age: number) {}

  sayHello() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  }
}
@Constructor("/sss")
export class Post {
  constructor(private name: string, private age: number) {}

  sayHello() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  }
}
const data = [Post, TestUser].map(c => Reflect.getMetadata(ControllerKey, c))
console.log(data)
