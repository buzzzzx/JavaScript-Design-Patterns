import StateMachine from "javascript-state-machine";

let fsm = new StateMachine({
  init: "pending",
  transitions: [
    {
      name: "resolve",
      from: "pending",
      to: "fullfilled",
    },
    {
      name: "reject",
      from: "pending",
      to: "rejected",
    },
  ],
  methods: {
    onResolve: function (state, data) {
      data.successList.forEach((fn) => fn());
    },
    onReject: function (state, data) {
      data.failList.forEach((fn) => fn());
    },
  },
});

class MyPromise {
  constructor(fn) {
    this.successList = [];
    this.failList = [];

    fn(
      () => {
        fsm.resolve(this);
      },
      () => {
        fsm.reject(this);
      }
    );
  }

  then(fn1, fn2) {
    this.successList.push(fn1);
    this.failList.push(fn2);
  }
}

// Test
function loadImg(src) {
  return new MyPromise((resolve, reject) => {
    let img = document.createElement("img");
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function () {
      reject();
    };
    img.src = src;
    resolve("hhh");
  });
}

let url = "https://picsum.photos/id/237/200/300";
const result = loadImg(url);
result.then(
  () => {
    console.log("ok1");
  },
  () => {
    console.log("fail1");
  }
);

result.then(
  () => {
    console.log("ok2");
  },
  () => {
    console.log("fail2");
  }
);
