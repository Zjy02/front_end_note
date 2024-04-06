new 操作符用于实例化构造函数 或者实例化类

    //基本用法
    function Test (name) = {
      this.name = name
    }

    Test.prototype.getName = function () {
      return this.name
    }

    let test = new Test('test')

1. 创建一个空对象
2. 改变对象原型
3. 改变this指向
4. 构造函数如果返回是应用类型 那么new 无效，否则生效

    function _new (fn, ...arg) {
      let obj = {}
      obj.__proto__ = fn.prototype
      // let obj = Object.create(fn.prototype) //代替上面两行代码
      const res = fn.apply.(obj, arg)
      return (res && typeof res === 'object') ? res : obj
    }

    let x = _new (Test, 'zjy')
    console.log(x)  {name: 'zjy'}