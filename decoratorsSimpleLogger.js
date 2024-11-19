"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Class decorator logs to console when a class is instantiated
function SimpleLogger(target) {
    console.log(`Class created: ${target.name}`);
}
// Method decorator logs method calls of MyTestClass
function LogMethod(target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`Method ${key} called with arguments: ${JSON.stringify(args)}`);
        return originalMethod.apply(this, args);
    };
    return descriptor;
}
// Accessor decorator prevents modification of a property
function MyReadOnly(target, key, descriptor) {
    descriptor.set = () => {
        throw new Error(`Cannot modify read-only property ${key}`);
    };
    console.log("Read-only decorator applied.");
}
let MyTestClass = class MyTestClass {
    constructor(name, studentNum, averageGPA) {
        this._name = name;
        this.studentNum = studentNum;
        this.averageGPA = averageGPA;
    }
    getName(firstName, lastName) {
        return "Hello, my name is " + firstName + " " + lastName;
    }
    get gpa() {
        return this.averageGPA;
    }
};
__decorate([
    LogMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MyTestClass.prototype, "getName", null);
__decorate([
    MyReadOnly,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], MyTestClass.prototype, "gpa", null);
MyTestClass = __decorate([
    SimpleLogger,
    __metadata("design:paramtypes", [String, Number, Number])
], MyTestClass);
// Test decorators
const myClass = new MyTestClass("Web App Practicum", 20, 3.5);
console.log(myClass.getName("Nha", "Pham"));
console.log("Average GPA:", myClass.gpa);
// Trying to modify the read-only property
try {
    myClass.gpa = 4.0;
}
catch (error) {
    console.error(error.message);
}
