# call()函数

> call(obj,arg1,arg2,arg3...) obj 为 this 绑定的值(obj 永远为一个对象) arg 为传递的参数

> call()函数 与 apply()函数类似,call() 函数是接受一个函数列表，而 apply()是接受一个包含多个参数的数组

> call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

    解释:
    不传，或者传 null，undefined，this 指向 window 对象（如果没有房子，那就只能露宿天地了，55555）
    传递另一个函数的函数名 fun2，this 指向函数 fun2 的 this 指向(fun2 随谁，俺就随谁，嫁鸡随鸡嫁狗随狗？)
    值为原始值(数字，字符串，布尔值),this 会指向该原始值的自动包装对象，如 Number、 String、Boolean
    传递一个对象，函数中的 this 指向这个对象

    例
    function Product(name, price) {
    this.name = name;
    this.price = price;
    console.log(this)
    }

    function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
    }

    console.log(new Food('cheese', 5).name);
    //Food { name: 'cheese', price: 5 } (this的值)
    //cheese

    没有传第一个参数，display的this指向全局对象 在node中为global
    在浏览器中为windows
    例
    var sData = 'Wisen';

    function display() {
    console.log('sData value is %s ', this.sData);
    }

    display.call();  // sData value is Wisen

# apply

> call()函数 与 apply()函数类似,call() 函数是接受一个函数列表，而 apply()是接受一个包含多个参数的数组

# bind

> call 和 apply 改变了函数的 this 上下文后便执行该函数,而 bind 则是返回改变了上下文后的一个函数。

# 应用

    获取最大 最小值
    var arr = [34,5,3,6,54,6,-67,5,7,6,-8,687];
    Math.max.apply(Math, arr);
    Math.max.call(Math, 34,5,3,6,54,6,-67,5,7,6,-8,687);
    Math.min.apply(Math, arr);
    Math.min.call(Math, 34,5,3,6,54,6,-67,5,7,6,-8,687);

    将对象转变为数组
    var arrayLike = {
    0: 'qianlong',
    1: 'ziqi',
    2: 'qianduan',
    length: 3
    }
    var arr = Array.prototype.slice.call(arrayLike);

    //数组追加
    var arr1 = [1,2,3];
    var arr2 = [4,5,6];
    [].push.apply(arr1, arr2);
    // arr1 [1, 2, 3, 4, 5, 6]
    // arr2 [4,5,6]

    //利用apply call 做继承
    var Person = function (name, age) {
    this.name = name;
    this.age = age;
    };
    var Girl = function (name) {
    Person.call(this, name);
    };
    var Boy = function (name, age) {
    Person.apply(this, arguments);
    }
    var g1 = new Girl ('qing');
    var b1 = new Boy('qianlong', 100);

    判断是否为数组格式
    var arr = [];
    var res = Object.prototype.toString.call(arr); // 这里获取的是变量的 [[class]]属性，一般方法没有，只有借用Object原型上的toString方法才可以
    console.log(res); // [Object Array]
