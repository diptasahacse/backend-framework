import "reflect-metadata";

const RequiredKey = Symbol("Required");

function Required(target: any, propertyKey: string, parameterIndex: number) {
  // Take Previous Required Parameters
  const existingRequiredParameters: number[] =
    Reflect.getOwnMetadata(RequiredKey, target, propertyKey) || [];

  // add current index to existing required parameters
  existingRequiredParameters.push(parameterIndex);

  // set new required parameters
  Reflect.defineMetadata(
    RequiredKey,
    existingRequiredParameters,
    target,
    propertyKey
  );
}

function Validate(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const requiredParameters =
      Reflect.getOwnMetadata(RequiredKey, target, propertyKey) || [];

    for (const index of requiredParameters) {
      if (args[index] === undefined) {
        throw new Error(
          ` Missing required parameter at index ${index} for ${propertyKey}`
        );
      }
    }
    return method.apply(this, args);
  };
}

export class TestUser {
  @Validate
  createUser(name: string, @Required email?: string) {
    return { name, email };
  }
}
const user = new TestUser();
console.log(user.createUser("John"));
// // console.log(user.name);
// console.log(user.name);
