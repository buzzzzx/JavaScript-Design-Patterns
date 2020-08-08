const EventEmitter = require("events").EventEmitter;
const fs = require("fs");
const readline = require("readline");
const http = require("http");

/**
 * Example 1
 */
const emitter1 = new EventEmitter();
emitter1.on("some", () => {
  // 监听 some 事件
  console.log("some event is occured 1");
});
emitter1.on("some", () => {
  // 监听 some 事件
  console.log("some event is occured 2");
});
// 触发 some 事件
emitter1.emit("some");

/**
 * Example 2
 */
const emitter = new EventEmitter();
emitter.on("sbowName", (name) => {
  console.log("event occured ", name);
});
emitter.emit("sbowName", "zhangsan"); // emit 时候可以传递参数过去

/**
 * Example 3
 */
// 任何构造函数都可以继承 EventEmitter 的方法 on emit
class Dog extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
  }
}
var simon = new Dog("simon");
simon.on("bark", function () {
  console.log(this.name, " barked");
});
setInterval(() => {
  simon.emit("bark");
}, 500);

/**
 * Example 4: stream
 */
let readStream = fs.createReadStream("../data/file1.txt");
let length = 0;
readStream.on("data", (chunk) => {
  length += chunk.toString().length;
});
readStream.on("end", () => {
  console.log("file length:", length);
});

/**
 * Example 5: readline
 */
let rl = readline.createInterface({
  input: fs.createReadStream("../data/file1.txt"),
});
let lineNum = 0;
rl.on("line", (line) => {
  lineNum += 1;
});
rl.on("close", () => {
  console.log("file lineNum:", lineNum);
});

/**
 * Example 6: http
 */
function serverCallback(req, res) {
  let method = req.method.toLowerCase();
  if (method === "get") {
    return "halo";
  }
  if (method === "post") {
    let data = "";
    req.on("data", (chunk) => {
      // 一点一点接收 data 参数的内容
      console.log("chunk", chunk.toString());
      data += chunk.toString();
    });

    req.on("end", () => {
      // 接收完毕，直接将内容输出
      console.log("end");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.writeData(data);
      res.end();
    });
  }
}

http.createServer(serverCallback).listen(8081);
console.log("监听 8081 端口");
