function Foo() {
  getName = function () { console.log(1) }
  return this
}

function getName() { console.log(2) } 2

Foo.getName = function () { console.log(3) }

Foo.prototype.getName = function () { console.log(4) }

var getName = function () { console.log(5) }


Foo.getName() //3
getName() //5
Foo().getName() //1
getName() //1
new (Foo.getName)() //3
  (new Foo()).getName() //4