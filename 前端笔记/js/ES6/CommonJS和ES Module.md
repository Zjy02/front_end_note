# CommonJS

> Commonjs 的提出，弥补 Javascript 对于模块化，没有统一标准的缺陷。nodejs 借鉴了 Commonjs 的 Module ，实现了良好的模块化管理。

- 应用:
  Node 是 CommonJS 在服务器端一个具有代表性的实现；
  Browserify 是 CommonJS 在浏览器中的一种实现；
  webpack 打包工具对 CommonJS 的支持和转换；也就是前端应用也可以在编译之前，尽情使用 CommonJS 进行开发。

- 使用：

      在 commonjs 中每一个 js 文件都是一个单独的模块，我们可以称之为 module；
      该模块中，包含 CommonJS 规范的核心变量: exports、module.exports、require；
      exports 和 module.exports 可以负责对模块中的内容进行导出；
      require 函数可以帮助我们导入其他模块（自定义模块、系统模块、第三方库模块）中的内容；

- commonjs 实现原理

  每个模块都存在三个变量 module exports require 然而这三个变量是没有被定义的，但是我们可以在 Commonjs 规范下每一个 js 模块上直接使用它们。在 node 中还存在 **filename 和 **dirname

        module 记录当前模块信息。
        require 引入模块的方法。
        exports 当前模块导出的属性

> 在编译时，实际时 commonjs 对 js 代码进行首尾包装 例如

        (function(exports,require,module,__filename,__dirname){
            const sayName = require('./hello.js')
                module.exports = function say(){
                    return {
                        name:sayName(),
                        author:'我不是外星人'
                    }
                }
            })

> 在 Commonjs 规范下模块中，会形成一个包装函数，我们写的代码将作为包装函数的执行上下文，使用的 require ，exports ，module 本质上是通过形参的方式传递到包装函数中的

- 包装函数

        function wrapper (script) {
            return '(function (exports, require, module, __filename, __dirname) {' +
                script +
            '\n})'
        }

- 包装函数执行

        如下模拟了一个包装函数功能， script 为我们在 js 模块中写的内容，最后返回的就是如上包装之后的函数。当然这个函数暂且是一个字符串。
            const modulefunction = wrapper(`
            const sayName = require('./hello.js')
                module.exports = function say(){
                    return {
                        name:sayName(),
                        author:'我不是外星人'
                    }
                }
            `)

- 在模块加载的时候，会通过 runInThisContext (可以理解成 eval ) 执行 modulefunction ，传入 require ，exports ，module 等参数。最终我们写的 nodejs 文件就这么执行了

         runInThisContext(modulefunction)(module.exports, require, module, __filename, __dirname)

## require 文件加载流程

- const fs = require('fs') // ① 核心模块
- const sayName = require('./hello.js') //② 文件模块
- const crypto = require('crypto-js') // ③ 第三方自定义模块

> require 方法执行的时候会接受唯一的参数作为一个标识符，commonjs 对不同的标识符，处理流程不同，但是母的相同，都是唯一找到对应的模块

- require 加载标识符原则：

  (在 node 中)

        1. 首先像 fs ，http ，path 等标识符，会被作为 nodejs 的核心模块。
        2. ./ 和 ../ 作为相对路径的文件模块， / 作为绝对路径的文件模块。
        3. 非路径形式也非核心模块的模块，将作为自定义模块。

- 核心模块处理

        核心模块的优先级仅次于缓存加载，在 Node 源码编译中，已被编译成二进制代码，所以加载核心模块，加载过程中速度最快。

- 路径形式的文件模块处理

        已 ./ ，../ 和 / 开始的标识符，会被当作文件模块处理。require() 方法会将路径转换成真实路径，并以真实路径作为索引，将编译后的结果缓存起来，第二次加载的时候会更快。至于怎么缓存的？我们稍后会讲到。

- 自定义模块处理

  > 一般指非核心模块，他可能是一个文件或一个包，他的查找遵循：

          在当前node_module目录查找

          如果没有，在父级的node_module查找，如果没有在父级目录的父级目录的 node_modules 中查找。

          沿着路径向上递归，知道根目录的node_module目录

          在查找过程中，会找 package.json 下 main 属性指向的文件，如果没有 package.json ，在 node 环境下会以此查找 index.js ，index.json ，index.node。

<img src="./require.jpg"/>

## require 模块引入与处理

> CommonJS 模块同步加载并执行模块文件，CommonJS 模块在执行阶段分析模块依赖，采用深度优先遍历（depth-first traversal），执行顺序是父 -> 子 -> 父；

        a.js文件
        const getMes = require('./b')
        console.log('我是 a 文件')
        exports.say = function(){
            const message = getMes()
            console.log(message)
        }

        b.js文件
        const say = require('./a')
        const  object = {
        name:'《React进阶实践指南》',
        author:'我不是外星人'
        }
        console.log('我是 b 文件')
        module.exports = function(){
            return object
        }

        主文件main.js
        const a = require('./a')
        const b = require('./b')

        console.log('node 入口文件')

### require 加载原理

- module ：在 Node 中每个文件都是一个 module，module 上保存了 export 等信息，还有一个 loaded

  loaded 为 true 是一杯加载
  loaded 为 fasle 是未被加载

- Module：整个系统循行之后，会用 Module 缓存一个模块的加载信息

- require 源码

         // id 为路径标识符
        function require(id) {
        /* 查找  Module 上有没有已经加载的 js  对象*/
        const  cachedModule = Module._cache[id]

        /* 如果已经加载了那么直接取走缓存的 exports 对象  */
        if(cachedModule){
            return cachedModule.exports
        }

        /* 创建当前模块的 module  */
        const module = { exports: {} ,loaded: false , ...}

        /* 将 module 缓存到  Module 的缓存属性中，路径标识符作为 id */
        Module._cache[id] = module
        /* 加载文件 */
        runInThisContext(wrapper('module.exports = "123"'))(module.exports, require, module, __filename, __dirname)
        /* 加载完成 *//
        module.loaded = true
        /* 返回值 */
        return module.exports
        }

- require 大致流程

        1. require 会接收一个参数——文件标识符，然后分析定位文件，接下来会从 Module 上查找有没有缓存，如果有缓存，那么直接返回缓存的内容。

        2. 如果没有缓存，会创建一个 module 对象，缓存到 Module 上，然后执行文件，加载完文件，将 loaded 属性设置为 true ，然后返回 module.exports 对象。借此完成模块加载流程。

        3. 模块导出就是 return 这个变量的其实跟 a = b 赋值一样， 基本类型导出的是值， 引用类型导出的是引用地址。

        4. exports 和 module.exports 持有相同引用，因为最后导出的是 module.exports， 所以对 exports 进行赋值会导致 exports 操作的不再是 module.exports 的引用。

### require 避免重复加载

        从上面我们可以直接得出，require 如何避免重复加载的，首先加载之后的文件的 module 会被缓存到 Module 上，比如一个模块已经 require 引入了 a 模块，如果另外一个模块再次引用 a ，那么会直接读取缓存值 module ，所以无需再次执行模块。

### require 避免循环引用

        那么接下来这个循环引用问题，也就很容易解决了。为了让大家更清晰明白，那么我们接下来一起分析整个流程。

        ① 首先执行 node main.js ，那么开始执行第一行 require(a.js)；
        ② 那么首先判断 a.js 有没有缓存，因为没有缓存，先加入缓存，然后执行文件 a.js （需要注意 是先加入缓存， 后执行模块内容）;
        ③ a.js 中执行第一行，引用 b.js。
        ④ 那么判断 b.js 有没有缓存，因为没有缓存，所以加入缓存，然后执行 b.js 文件。
        ⑤ b.js 执行第一行，再一次循环引用 require(a.js) 此时的 a.js 已经加入缓存，直接读取值。接下来打印 console.log('我是 b 文件')，导出方法。
        ⑥ b.js 执行完毕，回到 a.js 文件，打印 console.log('我是 a 文件')，导出方法。
        ⑦ 最后回到 main.js，打印 console.log('node 入口文件') 完成这个流程。

        不过这里我们要注意问题：

        如上第 ⑤ 的时候，当执行 b.js 模块的时候，因为 a.js 还没有导出 say 方法，所以 b.js 同步上下文中，获取不到 say。

- 如何获取到 say

1.  采用动态加载 a.js
2.  使用异步中加载

        const say = require('./a')
        const  object = {
        name:'《React进阶实践指南》',
        author:'我不是外星人'
        }
        console.log('我是 b 文件')
        console.log('打印 a 模块' , say)

        setTimeout(()=>{
            console.log('异步打印 a 模块' , say)
        },0)

        module.exports = function(){
            return object
        }

### require 动态加载

        例如
        console.log('我是 a 文件')
        exports.say = function(){
            const getMes = require('./b')
            const message = getMes()
            console.log(message)
        }

> require 本质上就是一个函数，那么函数可以在任意上下文中执行，来自由地加载其他模块的属性方法。

# export 和 module.export

## export

    exports.name = `《React进阶实践指南》`
    exports.author = `我不是外星人`
    exports.say = function (){
        console.log(666)
    }

    const a = require('./a')
    console.log(a)

> exports 就是传入到当前模块内的一个对象，本质上就是 module.exports。

- 为什么 exports={} 直接赋值一个对象就不可以呢？

> 通过上述讲解都知道 exports ， module 和 require 作为形参的方式传入到 js 模块中。我们直接 exports = {} 修改 exports ，等于重新赋值了形参，那么会重新赋值一份，

        function wrap (myExports){
            myExports={
            name:'我不是外星人'
        }
        }

        let myExports = {
            name:'alien'
        }
        wrap(myExports)
        console.log(myExports)

        //打印{name:'alien'}

> 假设 wrap 就是 Commonjs 规范下的包装函数，我们的 js 代码就是包装函数内部的内容。当我们把 myExports 对象传进去，但是直接赋值 myExports = { name:'我不是外星人' } 没有任何作用，相等于内部重新声明一份 myExports 而和外界的 myExports 断绝了关系。所以解释了为什么不能 exports={...} 直接赋值。
> 使用 export.name 就可以解决

## module.export

> 本质上就是 export

        module.exports ={
        name:'《React进阶实践指南》',
        author:'我不是外星人',
        say(){
            console.log(666)
        }
    }

> module.export 也可以单独导出一个函数或者一个类

        module.exports = function (){
                // ...
            }

> 从上述 require 原理实现中，我们知道了 exports 和 module.exports 持有相同引用，因为最后导出的是 module.exports 。那么这就说明在一个文件中，我们最好选择 exports 和 module.exports 两者之一，如果两者同时存在，很可能会造成覆盖的情况发生

- 既然有了 exports，为何又出了 module.exports ?

> 如果我们不想在 commonjs 中导出对象，而是只导出一个类或者一个函数再或者其他属性的情况，那么 module.exports 就更方便了，如上我们知道 exports 会被初始化成一个对象，也就是我们只能在对象上绑定属性，但是我们可以通过 module.exports 自定义导出出对象外的其他类型元素。

        let a = 1
        module.exports = a // 导出函数

        module.exports = [1,2,3] // 导出数组

        module.exports = function(){} //导出方法

- 与 exports 相比，module.exports 有什么缺陷?

> module.exports 当导出一些函数等非对象属性的时候，也有一些风险，就比如循环引用的情况下。对象会保留相同的内存地址，就算一些属性是后绑定的，也能间接通过异步形式访问到。但是如果 module.exports 为一个非对象其他属性类型，在循环引用的时候，就容易造成属性丢失的情况发生了。

# ES Module

> node 借鉴了 commonjs 实现了模块化，从 es6 开始，javascript 才真正意义上有自己的模块化规范

> 优点

1. 借助 Es Module 的静态导入导出的优势，实现了 tree shaking。
2. Es Module 还可以 import() 懒加载方式实现代码分割。

> ES Module 中使用 export 导出，import 导入模块

## 导出 export 和导入 import

> 所有通过 export 导出的属性，在 import 中可以通过解构的方式，解构出来

### export 正常导出和 import 导入

        const name = '《React进阶实践指南》'
        const author = '我不是外星人'
        export { name, author }
        export const say = function (){
            console.log('hello , world')
        }

        // name , author , say 对应 a.js 中的  name , author , say
        import { name , author , say } from './a.js'

- export { }， 与变量名绑定，命名导出。
- import { } from 'module'， 导入 module 的命名导出 ，module 为如上的 ./a.js
- 这种情况下 import { } 内部的变量名称，要与 export { } 完全匹配。

### 默认导出 export default

        const name = '《React进阶实践指南》'
        const author = '我不是外星人'
        const say = function (){
            console.log('hello , world')
        }
        export default {
            name,
            author,
            say
        }

        import mes from './a.js'
        console.log(mes)
        //{ name: '《React进阶实践指南》',author:'我不是外星人', say:Function }

> export default anything 导入 module 的默认导出。 anything 可以是函数，属性方法，或者对象
> 对于引入默认导出的模块，import anyName from 'module'， anyName 可以是自定义名称。

### 混合导入 | 导出

> ES6 module 可以使用 export default 和 export 导入多个属性。

        export const name = '《React进阶实践指南》'
        export const author = '我不是外星人'

        export default  function say (){
            console.log('hello , world')
        }

> 导入方式

        1.
        import theSay , { name, author as  bookAuthor } from './a.js'
        console.log(
            theSay,
            // ƒ say() {console.log('hello , world') }
            name,
            // "《React进阶实践指南》"
            bookAuthor
            // "我不是外星人"
        )


        2.
        import theSay, * as mes from './a'
        console.log(
            theSay,
            // ƒ say() { console.log('hello , world') }
            mes
            // { name:'《React进阶实践指南》' , author: "我不是外星人" ，default:  ƒ say() { console.log('hello , world') } }
        )

        导出的属性被合并到 mes 属性上， export 被导入到对应的属性上，export default 导出内容被绑定到 default 属性上。 theSay 也可以作为被 export default 导出属性。

### 重属名导入

        import {  name as bookName , say,  author as bookAuthor  } from 'module'
        console.log( bookName , bookAuthor , say ) //《React进阶实践指南》 我不是外星人

> 从 module 模块中引入 name ，并重命名为 bookName ，从 module 模块中引入 author ，并重命名为 bookAuthor。 然后在当前模块下，使用被重命名的名字。

### 重定向导出

> 可以把当前模块作为一个中转站，一方面引入 module 内的属性，然后把属性再给导出去。

        export * from 'module' // 第一种方式
        export { name, author, ..., say } from 'module' // 第二种方式
        export {   name as bookName ,  author as bookAuthor , ..., say } from 'module' //第三种方式

> 第一种方式：重定向导出 module 中的所有导出属性， 但是不包括 module 内的 default 属性。
> 第二种方式：从 module 中导入 name ，author ，say 再以相同的属性名，导出。
> 第三种方式：从 module 中导入 name ，重属名为 bookName 导出，从 module 中导入 author ，重属名为 bookAuthor 导出，正常导出 say 。

### 无模块导入，只运行模块

        import 'module'

> 执行 module 不导出值 多次调用 module 只运行一次。

### 动态导入

        const promise = import('module')

> import('module') ，动态导入返回一个 Promise。为了支持这种方式，需要在 webpack 中做相应的配置处理。

## ES Module 特性

### 静态语法

> ES6 module 的引入和导出是静态的，import 会自动提升到代码的顶层 ，import , export 不能放在块级作用域或条件语句中。

> 这种静态语法，在编译过程中确定了导入和导出的关系，所以更方便去查找依赖，更方便去 tree shaking (摇树) ， 可以使用 lint 工具对模块依赖进行检查，可以对导入导出加上类型信息进行静态的类型检查。

### 执行特性

> ES6 module 和 Common.js 一样，对于相同的 js 文件，会保存静态属性。

> 但是与 Common.js 不同的是 ，CommonJS 模块同步加载并执行模块文件，ES6 模块提前加载并执行模块文件，ES6 模块在预处理阶段分析模块依赖，在执行阶段执行模块，两个阶段都采用深度优先遍历，执行顺序是子 -> 父。

        console.log('main.js开始执行')
        import say from './a'
        import say1 from './b'
        console.log('main.js执行完毕')

        import b from './b'
        console.log('a模块加载')
        export default  function say (){
            console.log('hello , world')
        }

        console.log('b模块加载')
        export default function sayhello(){
            console.log('hello,world')
        }
        //b模块加载
        //a模块加载
        //main.js开始执行
        //main.js执行完毕

> main.js 和 a.js 都引用了 b.js 模块，但是 b 模块也只加载了一次。执行顺序是子 -> 父

### 导出绑定

> 不能修改 import 导出的属性
> 可以使用 import 导出的方法对属性进行修改

- 接下来对 import 属性作出总结：

1. 使用 import 被导入的模块运行在严格模式下。
2. 使用 import 被导入的变量是只读的，可以理解默认为 const 装饰，无法被赋值
3. 使用 import 被导入的变量是与原变量绑定/引用的，可以理解为 import 导入的变量无论是否为基本类型都是引用传递。

### import()动态导入

> import() 返回一个 Promise 对象， 返回的 Promise 的 then 成功回调中，可以获取模块的加载成功信息。

        import() 可以动态使用，加载模块。
        import() 返回一个 Promise ，成功回调 then 中可以获取模块对应的信息。 name 对应 name 属性， default 代表 export default 。__esModule 为 es module 的标识。

### import()可以做些什么

- import() 动态加载一些内容，可以放在条件语句或者函数执行上下文中。

        if(isRequire){
            const result  = import('./b')
        }

- 懒加载

  > vue 中的路由懒加载
  > react 中动态加载

- React.lazy 和 Suspense 配合一起用，能够有动态加载组件的效果。React.lazy 接受一个函数，这个函数需要动态调用 import() 。

- import() 这种加载效果，可以很轻松的实现代码分割。避免一次性加载大量 js 文件，造成首次加载白屏时间过长的情况。

### tree shaking

> Tree Shaking 在 Webpack 中的实现，是用来尽可能的删除没有被使用过的代码，一些被 import 了但其实没有被使用的代码。比如以下场
> 景：

        export let num = 1
        export const addNumber = ()=>{
            num++
        }
        export const delNumber = ()=>{
            num--
        }

        import {  addNumber } from './a'
        addNumber()

> 如上 a.js 中暴露两个方法，addNumber 和 delNumber，但是整个应用中，只用到了 addNumber，那么构建打包的时候，delNumber 将作为没有引用的方法，不被打包进来。

# CommonJS 和 ES Module

## CommonJS 总结

- CommonJS 模块由 JS 运行时实现。
- CommonJs 是单个值导出，本质上导出的就是 exports 属性。
- CommonJS 是可以动态加载的，对每一个加载都存在缓存，可以有效的解决循环引用问题。
- CommonJS 模块同步加载并执行模块文件。

## ES Module

- ES6 Module 静态的，不能放在块级作用域内，代码发生在编译时。
- ES6 Module 的值是动态绑定的，可以通过导出方法修改，可以直接访问修改结果。
- ES6 Module 可以导出多个属性和方法，可以单个导入导出，混合导入导出。
- ES6 模块提前加载并执行模块文件，
- ES6 Module 导入模块在严格模式下。
- ES6 Module 的特性可以很容易实现 Tree Shaking 和 Code Splitting。
