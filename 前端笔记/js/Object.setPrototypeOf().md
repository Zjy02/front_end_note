<!--
 * @Author: hyman
 * @Date: 2023-06-09 13:24:45
 * @LastEditors: hyman
 * @LastEditTime: 2023-07-09 13:38:36
 * @Description: 请填写简介
-->

# Object.setPrototypeOf()

> 用来修改一个指定对象的原型,（即内部的 [[Prototype]] 属性）设置为另一个对象或者 null
> 会影响性能 尽量使用 Object.create()
> Object.setPrototypeOf(obj, prototype)

    obj 要设置其原型的对象。不能为undefined和null
    prototype 该对象的新原型（一个对象或 null）。

> 返回指定对象
