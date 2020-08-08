/**
 * Example: Image
 */
class RealImage {
  constructor(filename) {
    this.filename = filename;
    this.loadFromDisk(); // 模拟，从硬盘中读取到内存
  }

  loadFromDisk() {
    console.log("loading... ", this.filename);
  }

  display() {
    console.log("display... ", this.filename);
  }
}

class ProxyImage {
  constructor(filename) {
    this.realImg = new RealImage(filename);
  }

  display() {
    this.realImg.display();
  }
}

// Test
const img = new ProxyImage("1.png");
img.display();

/**
 * Example: ES6 Proxy
 */

const star = {
  name: "Yang Mi",
  age: 36,
  phone: "1333333331",
};

const agent = new Proxy(star, {
  get: function (target, key) {
    if (key === "phone") {
      // 返回经纪人自己的手机号
      return "18611112222";
    }
    if (key === "price") {
      // 明星不报价，经纪人报价
      return 120000;
    }
    return target[key];
  },
  set: function (target, key, val) {
    if (key === "customPrice") {
      if (val < 100000) {
        // 最低 10w
        throw new Error("价格太低");
      } else {
        target[key] = val;
        return true;
      }
    }
  },
});
