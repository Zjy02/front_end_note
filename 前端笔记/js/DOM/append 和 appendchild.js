// append 和 appendchild都是将元素添加到文档中

// append(...nodes: (Node | string)[]): void;
// appendChild < T extends Node > (node: T): T;


//区别一 参数不同,
// append 可接受节点和字符串
// appendchild 只接受节点
let div = document.createElement('div')
let p = document.createElement('p')

div.append(p)  // <div><p></p></div>
div.append('txt') //<div>txt</div>

div.appendChild(p) //<div><p></p></div>

div.appendChild('x') //  Uncaught TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'


// 区别二
// append可接受多个参数
// appendChild 只接受一个参数

div.append(p, p, p) //<div><p></p><p></p><p></p></div>

div.appendChild(p, p, p) // <div><p></p></div>

// 区别三

// append 没有返回值、
// appendChild 返回插入的节点对象：