/**
 * Question 1
 */
class Car {
  constructor(name, carID) {
    this.name = name;
    this.carID = carID;
  }
}

class ExpressCar extends Car {
  constructor(name, carID) {
    super(name, carID);
    this.price = 1;
  }
}

class SpecialCar extends Car {
  constructor(name, carID) {
    super(name, carID);
    this.price = 2;
  }
}

class Trip {
  constructor(car) {
    this.car = car;
  }

  start() {
    console.log(
      `行程开始，车辆名称：${this.car.name}，车牌号：${this.car.carID}`
    );
  }

  end() {
    console.log(`行程结束，价格：${this.car.price * 5}`);
  }
}

/**
 * Question 2
 */
class Camera {
  shot(car) {
    return {
      carID: car.carID,
      inTime: Date.now(),
    };
  }
}

class Screen {
  show(car, inTime) {
    console.log(`车辆车牌号：${car.carID}，停车时间：${Date.now() - inTime}`);
  }
}

class Park {
  constructor(floors) {
    this.floors = floors || [];
    this.camera = new Camera();
    this.screen = new Screen();
    this.carList = {};
  }

  emptyNumber() {
    return this.floors
      .map((floor) => {
        return `${floor.index} 层还有 ${floor.emptyPlaceNumber()} 个空闲车位`;
      })
      .join("\n");
  }

  in(car) {
    const info = this.camera.shot(car);
    const position = parseInt((Math.random() * 100) % 100);
    const place = this.floors[0].places[position];
    place.carIn();
    info.place = place;
    // 记录信息
    this.carList[car.carID] = info;
  }

  out(car) {
    const info = this.carList[car.carID];
    const place = info.place;
    place.carOut();
    this.screen.show(car, info.inTime);
    // 清空记录
    delete this.carList[car.carID];
  }
}

class Floor {
  constructor(index, places) {
    this.index = index;
    this.places = places || [];
  }

  emptyPlaceNumber() {
    let num = 0;

    this.places.forEach((place) => {
      if (place.isEmpty) {
        num += 1;
      }
    });

    return num;
  }
}

class Place {
  constructor() {
    this.isEmpty = true;
  }

  carIn() {
    this.isEmpty = false;
  }

  carOut() {
    this.isEmpty = true;
  }
}

export { Trip, ExpressCar, SpecialCar, Park, Floor, Place, Car };
