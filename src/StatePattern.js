class State {
  constructor(color) {
    this.color = color;
  }

  handle(context) {
    console.log(`turn to ${this.color} light`);
    context.setState(this);
  }
}

class Context {
  constructor() {
    this.state = nul;
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
  }
}

// Test
let context = new Context();
let red = new State("red");
let green = new State("green");
let yellow = new State("yelloe");

// 红灯亮了
red.handle(context);
console.log(context.getState());

// 绿灯亮了
green.handle(context);
console.log(context.getState());

// 黄灯亮了
yellow.handle(context);
console.log(context.getState());
