import { readonly, deprecate } from "core-decorators";

/**
 * Example 1
 */
function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list);
  };
}

const Foo = {
  foo() {
    alert("foo");
  },
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo(); // 'foo'

/**
 * Example 2
 * - myReadonly
 * - core-decorators: readonly, deprecate
 */
function myReadonly(target, name, descriptor) {
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

class Person {
  constructor() {
    this.first = "A";
    this.last = "B";
  }

  // @myReadonly
  @readonly
  name() {
    return `${this.first} ${this.last}`;
  }

  @deprecate("已费用")
  age() {
    return 20;
  }
}

var p = new Person();
console.log(p.name());
p.name = function () {}; // 这里会报错，因为 name 是只读属性

/**
 * Example 3
 */
function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function () {
    console.log(`Calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}

class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

const math = new Math();
const result = math.add(2, 4);
console.log("result", result);
