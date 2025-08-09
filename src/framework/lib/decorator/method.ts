function CheckPerformance(
  target: any,
  propertyKey: string ,
  propertyDescriptor: PropertyDescriptor
) {
    const originalMethod = propertyDescriptor.value;
  propertyDescriptor.value = function (...args: any[]) {
    console.log(`Call From performance ${propertyKey}`);
    const start = performance.now();

    const result = originalMethod.apply(this, args);
    const end = performance.now();
    const duration = (end - start).toFixed(2);
    console.log("result", result);
    console.log(`Call From performance ${propertyKey} executed in ${duration}ms`);
    console.log('End')
    return result;
  };
}

class Person {
  constructor(private name: string, private age: number) {}
  @CheckPerformance
  sayHello() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );

    return "Hello";
  }

  @CheckPerformance
  longJob() {
    for (let i = 0; i < 10000000; i++) {}
  }
}
const person = new Person("John", 30);
person.sayHello();
person.longJob();