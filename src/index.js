import {
  Trip,
  ExpressCar,
  SpecialCar,
  Park,
  Floor,
  Place,
  Car,
} from "./UMLInterview";
import { SingleObject } from "./SingletonPattern";

// ====UML Interview====
// Test: question 1
let expressCar = new ExpressCar("大众", 1234);
let specailCar = new SpecialCar("沃尔沃", 9876);
let trip1 = new Trip(expressCar);
let trip2 = new Trip(specailCar);
trip1.start();
trip1.end();
trip2.start();
trip2.end();

// Test: question 2
// 初始化停车场🅿️
let floors = [];
for (let i = 0; i < 3; i += 1) {
  let places = [];
  for (let j = 0; j < 100; j += 1) {
    places[j] = new Place();
  }
  floors[i] = new Floor(i + 1, places);
}
let park = new Park(floors);

// 初始化车辆🚗
let car1 = new Car("a", 100);
let car2 = new Car("b", 200);
let car3 = new Car("c", 300);

// 车辆进入停车场
console.log("第一辆车进入");
console.log(park.emptyNumber());
park.in(car1);
console.log("第二辆车进入");
console.log(park.emptyNumber());
park.in(car2);
console.log("第一辆车离开");
park.out(car1);
console.log("第二辆车离开");
park.out(car2);

console.log("第三辆车进入");
console.log(park.emptyNumber());
park.in(car3);
console.log("第三辆车离开");
park.out(car3);

// ====单例模式====
let instance1 = SingleObject.getInstance();
let instance2 = SingleObject.getInstance();
instance1.login();
instance2.login();
console.log("instance1 === instance2", instance1 === instance2);

// 因为 JS 没有访问控制，所以无法阻止用户 new 操作
let instance3 = new SingleObject();
console.log("instance1 !== instance3", instance1 !== instance3);
