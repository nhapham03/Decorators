// Class decorator logs to console when a class is instantiated
function SimpleLogger(target: Function) {
  console.log(`Class created: ${target.name}`);
}

// Method decorator logs method calls of MyTestClass
function LogMethod(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Method ${key} called with arguments: ${JSON.stringify(args)}`);
    return originalMethod.apply(this, args);
  };
  return descriptor;
}

// Accessor decorator prevents modification of a property
function MyReadOnly(target: any, key: string, descriptor: PropertyDescriptor) {
  descriptor.set = () => {
    throw new Error(`Cannot modify read-only property ${key}`);
  };
  console.log("Read-only decorator applied.");
}

//My Test Class
@SimpleLogger
class MyTestClass {
  public _name: string;
  private studentNum: number;
  public averageGPA: number;

  constructor(name: string, studentNum: number, averageGPA: number) {
    this._name = name;
    this.studentNum = studentNum;
    this.averageGPA = averageGPA;
  }

  @LogMethod
  getName(firstName: string, lastName: string) {
    return "Hello, my name is " + firstName + " " + lastName;
  }

  @MyReadOnly
  get gpa() {
    return this.averageGPA;
  }
}

// Test decorators
const myClass = new MyTestClass("Web App Practicum", 20, 3.5);
console.log(myClass.getName("Nha", "Pham"));
console.log("Average GPA:", myClass.gpa);

// Trying to modify the read-only property
try {
  (myClass as any).gpa = 4.0;
} catch (error) {
  console.error((error as Error).message);
}
