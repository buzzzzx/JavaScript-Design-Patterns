class SingleObject {
  login() {
    console.log("login...");
  }
}

SingleObject.getInstance = (function () {
  let instance;
  return function () {
    if (!instance) {
      instance = new SingleObject();
    }
    return instance;
  };
})();

// Test
let instance1 = SingleObject.getInstance();
let instance2 = SingleObject.getInstance();
instance1.login();
instance2.login();
console.log("instance1 === instance2", instance1 === instance2);

// 因为 JS 没有访问控制，所以无法阻止用户 new 操作
let instance3 = new SingleObject();
console.log("instance1 !== instance3", instance1 !== instance3);

export { SingleObject };
