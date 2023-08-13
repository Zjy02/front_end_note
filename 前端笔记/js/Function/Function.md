# Function

> 每个函数都是 Function 的实例

## 创建函数方式

> 函数声明

    function a(){}

> 使用函数表达

    let a = function(){}

> 使用箭头函数

    let a = ()=>{}

> 使用构造函数,不推荐

    let a = new Function('num1','num2','return num1 + num2')

    最后一个参数会被当作函数体，之前的都是函数的参数

## 函数名

> 函数名是指向函数的指针，跟指向对象的指针是一样的行为

    function a (){
        return 2
    }
    a() // 2

    let b = a

    a = null

    b() //2

> 每个函数都会暴露一个 name 属性

    function a(){}
    let b = function(){}
    let c = ()=>{}
    let d = new Function()

    a.name //a
    b.name //b
    c.name //c
    d.name //anonymous

> 如果一个函数赋值给一个变量，访问 name，name 值是创建时的函数名,如果是构造函数创建 name 还是 anonymous

        let a = function(){ return 2}
        let b =  a

        a = null
        console.log(b.name) // a
        console.log(a)      //null
        console.log(b())    // 2

## 参数

> ECMAScript 函数不关心传入参数的个数，参数的数据类型，传或者不传都不会报错
> 函数的参数在内部表现为一个类数组 arguments，arguments 有长度 length
> 可以函数(非箭头函数)内部访问到 arguments，可以通过 arguments[n] 来访问传进来的参数
> arguments 有迭代入口，也就是有 symbol.iterator 属性

        let a = function(){
            console.log(arguments[3])
        }

        a(1,2,3,4,5,6) //4

> ECMAScript 函数的参数只是为了方便才写出的，并不是必须写，ECMAScript 函数的参数创建之后不会在调用时匹配函数签名

> arguments 始终会与 对应的命名参数同步，修改 arguments 之后，对应参数也会变
> 但这不代表 arguments 和 对应参数访问同一个空间
> 调用时没有传第二个参数，在函数内部使用 arguments[1]来赋值，num2 也是 undefined

        console.log(typeof arguments);    // 'object'

            let a = function(num1,num2){
            console.log(num1)
            arguments[0] = 20
            arguments[1] = 10
            console.log(num1)
            console.log(num2)
            console.log(arguments)
        }

        a(1)
            //1
            //1
            //undefined
            //[Arguments] { '0': 20, '1': 10 }

> 在严格模式下，给 arguments 赋值，不会改变 num 的值，num 还是调用时传来的值，如果重新 arguments 会报错

> 箭头函数没有 arguments 对象，只能通过命名参数访问

## 默认参数

> arguments 不会反映参数的默认值
> function a (name='tom'){

    console.log(arguments[0]) // undefined

}

> 参数的默认值不限于原始值和对象类型，还可以使用函数返回值

    function num(){
        return 'tom'
    }

    function a( name='lihau',friends= num()){

    }

> 函数的默认参数只有在被调用且没有传递对应参数时，才会对默认参数求值
> 箭头函数也可以使用这样的使用默认参数

        (name='lihua')=>{

        }

> 默认参数作用域和暂时性死域

    function a(name='tom', job='java'){}
    //相当于
    function a(){
        let name='tom'
        let job ='java'
    }


    function a ( num=10, j0bNum=num+10){

    }
    a() //jobNum => 20

> 参数会按照定义他们的顺序去初始化，前面的参数不能使用后面没有定义参数
> 参数也存在自己的作用域，参数不能引用函数体的作用域

## 收集参数

> 在函数定义时，使用扩展运算符把独立的参数组合成一个数组，类似 arguments 的构造机制，但是收集参数
> 是数组的一个实例

    function a(...value){
        return value.reduce((prev,item)=> prev + item,0)
    }

    //剩余参数

    //...value只能为最后一个参数
    //不能写成(...value,first)

    function a(first, ...value){
        //value接受除了第一个参数的其他所有参数
        return value
    }

> 使用收集参数不影响 arguments
