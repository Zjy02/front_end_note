# script 标签

## 引入js代码

> 内联
    <\script> console.log</\script>

> 外置
    <\script src="./js/0.js"></\script>

> 动态引入

  var myScript = document.createElement("script");
  myScript.textContent = 'alert("✋")';
  document.head.appendChild(myScript);

## 加载js defer/asnyc

> 参考 script的defer和async

## 模块化

> type属性，该属性原本是用来指定 script 脚本的 MIME 类型
> 默认值是 text/javascript，其他值还有诸如：text/ecmascript、application/ecmascript、application/javascript 等等
> 现代浏览器很多都不再使用这些值了；而是把 type 用来支持 es6 的模块功能 type='module'

    <scrip type="module">
      import { sayHi } from "./hello.js"; 
      document.body.innerHTML = sayHi("Onion");
    </scrip>
> 当脚本使用 import 指令时，浏览器会自动请求并加载相关的 JS 文件
> 只不过下载过程中会顺道把 import 导入的文件也给下载了；如果和 async 属性一起使用，其加载方式就是 async 形式了

> type = 'nomodule'
        <scrip type="module" src="app.js"></scrip>
        <scrip nomodule src="classic-bundle.js"></scrip>

> 这个功能主要是用来兼容一些老版本的浏览器：

  支持 module 的浏览器，设定上就不会执行 nomodule 属性的 script 脚本，所以它只会跑上方的 app.js 脚本

  而老破旧的浏览器不支持 type="module"，会跳过这个 script 标签；同时又由于它不认识 nomodule 属性，反倒会执行 nomodule script 里的 classic-bundle.js 文件了

## 安全机制

> integrity
> nonce
> referrerPolicy
> crossorigin

## 其他
> language: 早年间用来指定脚本语言的属性，如 Javascript、JavaScript1.2、VBScript，不过现在已弃用

> charset：指定代码的字符集，如charset="UTF-8"，可惜也已经过时了