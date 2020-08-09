class Memo {
  constructor(content) {
    this.content = content;
  }

  getContent() {
    return this.content;
  }
}

class CareTaker {
  constructor() {
    this.list = [];
  }

  add(memo) {
    this.list.push(memo);
  }

  get(index) {
    return this.list[index];
  }
}

class Editor {
  constructor() {
    this.content = null;
  }

  setContent(content) {
    this.content = content;
  }

  getContent() {
    return this.content;
  }

  saveContentToMemo() {
    return new Memo(this.content);
  }

  getContentFromMemo(memo) {
    this.content = memo.getContent();
  }
}

// Test
let editor = new Editor();
let careTaker = new CareTaker();

editor.setContent(111);
editor.setContent(222);
careTaker.add(editor.saveContentToMemo());
editor.setContent(333);
careTaker.add(editor.saveContentToMemo());
editor.setContent(444);

console.log(editor.getContent());
console.log(editor.getContentFromMemo(careTaker.get(1)));
console.log(editor.getContent());
console.log(editor.getContentFromMemo(careTaker.get(0)));
console.log(editor.getContent());
