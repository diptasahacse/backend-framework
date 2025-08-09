const ControllerKey = Symbol("Controller");

function Capitalized(
  target: Object,
  propertyKey: string,
  propertyDescriptor: PropertyDescriptor
) {
  const originalGetter = propertyDescriptor.get;
  propertyDescriptor.get = function () {
    // console.log(`Get from ${propertyKey}`)
    const value = originalGetter?.call(this);
    return value.toUpperCase();
  };
}

export class TestUser {
  private _name = "John";
  // @Capitalized
  // get name() {
  //   return this._name;
  // }

  @Capitalized
  get name() {
    return this._name;
  }
}
const user = new TestUser();
// console.log(user.name);
console.log(user.name);
