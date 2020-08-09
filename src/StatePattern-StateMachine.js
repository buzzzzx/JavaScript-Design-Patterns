import StateMachine from "javascript-state-machine";

let fsm = new StateMachine({
  init: "收藏",
  transitions: [
    {
      name: "doStore",
      from: "收藏",
      to: "取消收藏",
    },
    {
      name: "deleteStore",
      from: "取消收藏",
      to: "收藏",
    },
  ],
  methods: {
    onDoStore: function () {
      alert("收藏成功");
      updateText();
    },
    onDeleteStore: function () {
      alert("取消收藏成功"), updateText();
    },
  },
});

let button = document.getElementById("btn1");
button.addEventListener("click", () => {
  if (fsm.is("收藏")) {
    fsm.doStore();
  } else {
    fsm.deleteStore();
  }
});

function updateText() {
  button.textContent = fsm.state;
}

updateText();
