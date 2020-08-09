class Iterator {
  constructor(container) {
    this.list = container.list;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.list.length;
  }

  next() {
    if (this.hasNext()) {
      let res = this.list[this.index];
      this.index += 1;
      return res;
    }
    return undefined;
  }
}

class Container {
  constructor(list) {
    this.list = list;
  }

  getIterator() {
    return new Iterator(this);
  }
}

// Test
let arr = [1, 2, 3, 4, 5, 6];
let container = new Container(arr);
let itr = container.getIterator();
while (itr.hasNext()) {
  console.log(itr.next());
}
