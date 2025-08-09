
function MinLength(min: number = 3) {
  return function (target: Object, propertyKey: string) {
    let value: string;

    Object.defineProperty(target, propertyKey, {
      get() {
        return value;
      },
      set(newValue: string) {
        if (newValue.length < min) {
          throw new Error(
            `The length of ${propertyKey} must be greater than ${min}`
          );
        }
        value = newValue;
      },
    });
  };
}
function MinNumber(min: number = 0) {
  return function (target: Object, propertyKey: string) {
    let value: number;

    Object.defineProperty(target, propertyKey, {
      get() {
        return value;
      },
      set(newValue: number) {
        if (newValue < min) {
          throw new Error(
            `Number of ${propertyKey} must be greater than ${min}`
          );
        }
        value = newValue;
      },
    });
  };
}
function Email(target: Object, propertyKey: string) {
    let value: string;

    Object.defineProperty(target, propertyKey, {
      get() {
        return value;
      },
      set(newValue: string) {
        if (!newValue.includes("@")) {
          throw new Error(
            `The email of ${propertyKey} must be a valid email address`
          );
        }
        value = newValue;
      },
    });
  };

export class TestUser {
  @MinLength()
  private _name = "Jvvvvv";

  @MinNumber(20)
  private _age = 20;


  @Email
  private _email = "jvvvvv@gmail.com";

  get name() {
    return this._name;
  }

  get age(): number {
    return this.age;
  }
}
const user = new TestUser();
// // console.log(user.name);
// console.log(user.name);










