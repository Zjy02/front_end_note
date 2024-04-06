// 实现Main 继承 people
function People() {
  this.type = 'people'
}

People.prototype.eat = function () {
  console.log('eat');
}

function Main(name) {
  this.name = name
  this.color = 'black'
}

// 原型继承
// 父类指向子类的原型
Main.prototype = new People()

// 构造继承
// 缺点：不能继承父类原型，函数在构造函数中，每个子类实例不能共享函数，浪费内存。
function Main(name) {
  People.call(this)
}

// 组合继承
// 缺点：父类原型和子类原型是同一个对象，无法区分子类真正是由谁构造。
function Main(name) {
  People.call(this)
}

Main.prototype = People.prototype

// 寄生组合继承
function Man(name) {
  People.call(this);
}

Man.prototype = Object.create(People.prototype, {
  constructor: {
    value: Man
  }
})

// inherits函数

function inherits(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

// 使用
function Man() {
  People.call(this);
  //...
}
inherits(Man, People);

// Man.prototype.fun = ...