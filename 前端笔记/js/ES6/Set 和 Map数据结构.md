# Set

> 类似于数组，但是成员都是唯一的，没有重复的值
> set 本身是一个构造函数，用来生成 set 数据结构

    const s = new Set()

> set 函数可以接受一个数组(或者接受一个 iterable 接口的其他数据结构)作为参数，用来初始化

    // 例一
    const set = new Set([1, 2, 3, 4, 4]);
    [...set]
    // [1, 2, 3, 4]

    const set = new Set(document.querySelectorAll('div'));
    set.size
    接受类似数组的对象作为参数
    // 类似于
    const set = new Set();
    document
    .querySelectorAll('div')
    .forEach(div => set.add(div));
    set.size // 56

- 可以对字符串去重
  [...new Set('ababbc')].join('')
  // "abc"

- 向 set 总加入值，不会发生类型转换，'5'和 5 是两个不同的值
- set 内部判两个值是否为不同采用的是 Same-value-zero equality 算法(object.is()采用 Same-value equality)
- Same-value-zero equality 算法

        function sameValueZero(x, y) {
            if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y)) {
                return false;
            }
            return x === y || (x === 0 && y === 0);
        }

        console.log(sameValueZero(0, -0)); // true
        console.log(sameValueZero(NaN, NaN)); // true
        console.log(sameValueZero(42, 42)); // true
        console.log(sameValueZero(42, '42')); // false
        console.log(sameValueZero({}, {}));

- 对象总是不相同

## set 的属性和方法

- Set 结构的实例有以下属性。

  Set.prototype.constructor：构造函数，默认就是 Set 函数。
  Set.prototype.size：返回 Set 实例的成员总数。

- Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

  Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
  Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
  Set.prototype.has(value)：返回一个布尔值，表示该值是否为 Set 的成员。
  Set.prototype.clear()：清除所有成员，没有返回值。

- 使用 Array.from 将 set 转换成数组(去重的方法)

        function dedupe(array) {
            return Array.from(new Set(array));
        }

        dedupe([1, 1, 2, 3])

- set 结构实例有四个遍历方法，用于遍历成员

  Set.prototype.keys()：返回键名的遍历器
  Set.prototype.values()：返回键值的遍历器
  Set.prototype.entries()：返回键值对的遍历器
  Set.prototype.forEach()：使用回调函数遍历每个成员
  需要特别指出的是，Set 的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用

> keys values entries 方法都是返回遍历器对象，由于 set 没有键名，只有键值(或者说键值和键名是同一个)，

        let set = new Set(['red', 'green', 'blue']);

        for (let item of set.keys()) {
        console.log(item);
        }
        // red
        // green
        // blue

        for (let item of set.values()) {
        console.log(item);
        }
        // red
        // green
        // blue

        for (let item of set.entries()) {
        console.log(item);
        }
        // ["red", "red"]
        // ["green", "green"]
        // ["blue", "blue"]

> 所以 key values 方法是一样的
> entries 是返回遍历器
> Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的 values 方法。

    Set.prototype[Symbol.iterator] === Set.prototype.values

> 这意味着，可以省略 values 方法，直接用 for...of 循环遍历 Set

- foreach，用于对没个成员实行某种操作没有返回值
  forEach((value,key,set)=>{},thiarg)
  value 为键值
  key 为键名
  set 为集合本省
  thisarg 为绑定处理函数内部 this 对象
- ... 内部使用 for of 循环，所以也可以用于 set 结构

# weakSet

> 与 set 类似，也是不重复集合，但是 weakset 存放对象
> set 中的对象都是弱引用，即垃圾回收机制不考虑 weakset 对对象的引用，也就是其他对象都不在引用该
> 对象，那么垃圾回收机制自动回收对象所占内存，不考虑对象是否还存在 weakset 中
> WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。

> 由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，"因此 ES6 规定 WeakSet 不可遍历"。 没有属性 size 和 foreach 方法

    const a = [[1, 2], [3, 4]];
    const ws = new WeakSet(a);
    // WeakSet {[1, 2], [3, 4]}

    a 是一个数组，两个成员都是数组，是a数组的成员编程weakset成员，不是a本身，所以a数组成员必须是对象
    const b = [3, 4];
    const ws = new WeakSet(b);
    // Uncaught TypeError: Invalid value used in weak set(…)

> weakset 结构有三个方法

- WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员，返回 WeakSet 结构本身。
- WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员，清除成功返回 true，如果在 WeakSet 中找不到该成员或该成员不是对象，返回 false。
- WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

# Map

> object 本子就是键值对的集合，但是传统上只能用字符串当做键，当使用非字符串时，会自动转换成字符串

    const data = {};
    const element = document.getElementById('myDiv');

    data[element] = 'metadata';
    data['[object HTMLDivElement]'] // "metadata"

> 为了解决这个问题，es6 提供了 map，map 类似对象，也是键值对，但是键不限于字符串。各种类型都可以当做键，map 结构提供 值-值的对应
> 任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作 Map 构造函数的参数

    const set = new Set([
    ['foo', 1],
    ['bar', 2]
    ]);
    const m1 = new Map(set);
    m1.get('foo') // 1

    const m2 = new Map([['baz', 3]]);
    const m3 = new Map(m2);
    m3.get('baz') // 3

> 只有对同一个对象的引用，map 结构才将其视为同一个键

    const map = new Map();

    map.set(['a'], 555);
    map.get(['a']) // undefined

- 同理，同样的值的两个实例，在 Map 结构中被视为两个键。

  const map = new Map();

  const k1 = ['a'];
  const k2 = ['a'];

  map
  .set(k1, 111)
  .set(k2, 222);

  map.get(k1) // 111
  map.get(k2) // 222

  > Map 的键实际上是跟内存地址绑定的，只要内存地址不同，就视为两个键

- 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如 0 和-0 就是一个键，布尔值 true 和字符串 true 则是两个不同的键。另外，undefined 和 null 也是两个不同的键。虽然 NaN 不严格相等于自身，但 Map 将其视为同一个键。

- map 实例方法和属性

  size 属性返回 map 数据结构的成员总数

  Map.prototype.set(key, value)
  set 方法设置键名 key 对应的键值为 value，然后返回整个 Map 结构。如果 key 已经有值，则键值会被更新，否则就新生成该键。

  Map.prototype.get(key)
  get 方法读取 key 对应的键值，如果找不到 key，返回 undefined。

  Map.prototype.has(key)
  has 方法返回一个布尔值，表示某个键是否在当前 Map 对象之中

  Map.prototype.delete(key)
  delete 方法删除某个键，返回 true。如果删除失败，返回 false

  Map.prototype.clear()
  clear 方法清除所有成员，没有返回值

- 遍历方法
  Map.prototype.keys()：返回键名的遍历器。
  Map.prototype.values()：返回键值的遍历器。
  Map.prototype.entries()：返回所有成员的遍历器。
  Map.prototype.forEach()：遍历 Map 的所有成员

> Map 的遍历顺序就是插入顺序
> map 转换为数组 较快的方法是 ...

    const map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
    ]);

    [...map.keys()]
    // [1, 2, 3]

    [...map.values()]
    // ['one', 'two', 'three']

    [...map.entries()]
    // [[1,'one'], [2, 'two'], [3, 'three']]

    [...map]
    // [[1,'one'], [2, 'two'], [3, 'three']]

> forEach 方法

    const reporter = {
    report: function(key, value) {
        console.log("Key: %s, Value: %s", key, value);
    }
    };

    map.forEach(function(value, key, map) {
    this.report(key, value);
    }, reporter);

    forEach方法的回调函数的this，就指向reporter

## map 与其他数据结构相互转换

1. map 转数组 使用 ...

2. 数组转 map
   将输入传入 map 的构造函数
   new Map([
   [true, 7],
   [{foo: 3}, ['abc']]
   ])
   // Map {
   // true => 7,
   // Object {foo: 3} => ['abc']
   // }
3. map 转对象
   如果 map 的键都是字符串，他可以无损转为对象
   function strMapToObj(strMap) {
   let obj = Object.create(null);
   for (let [k,v] of strMap) {
   obj[k] = v;
   }
   return obj;
   }

   const myMap = new Map()
   .set('yes', true)
   .set('no', false);
   strMapToObj(myMap)
   如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名

4. 对象转 map
   可以通过 object.entries
   let obj = {"a":1, "b":2};
   let map = new Map(Object.entries(obj));

   也可以自己写
   function objToStrMap(obj) {
   let strMap = new Map();
   for (let k of Object.keys(obj)) {
   strMap.set(k, obj[k]);
   }
   return strMap;
   }

   objToStrMap({yes: true, no: false})

5. map 转 json
   map 键名都是字符串，这是可以直接转为 json JSON.stringify()
   map 的键名有费非字符串，现将 map 转为数组，在转为 json

# WeakMap

> weakmap 与 map 类似 也是生成键值对的集合
> 主要区别有两点，weakmap 只接受对象作为键名(null 除外)，不接受其他类型
> weakmap 的键名所指的对象，不计入垃圾回收机制

        const e1 = document.getElementById('foo');
        const e2 = document.getElementById('bar');
        const arr = [
        [e1, 'foo 元素'],
        [e2, 'bar 元素'],
        ];

        上面代码中，e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。这就形成了arr对e1和e2的引用。

        一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存。

        // 不需要 e1 和 e2 的时候
        // 必须手动删除引用
        arr [0] = null;
        arr [1] = null

> WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用

> 一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用 WeakMap 结构。当该 DOM 元素被清除，其所对应的 WeakMap 记录就会自动被移除

> 注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用

## WeakMap 语法

> WeakMap 与 Map 在 API 上的区别主要是两个，一是没有遍历操作（即没有 keys()、values()和 entries()方法），也没有 size 属性。因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。二是无法清空，即不支持 clear 方法。因此，WeakMap 只有四个方法可用：get()、set()、has()、delete()。

# WeakRef

> weakset 和 weakmap 是给予弱引用的数据结构，es2021 更新 提供 weakref 对象，用于直接创建弱引用

> WeakRef 实例对象有一个 deref()方法，如果原始对象存在，该方法返回原始对象；如果原始对象已经被垃圾回收机制清除，该方法返回 undefined

    let target = {};
    let wr = new WeakRef(target);

    let obj = wr.deref();
    if (obj) { // target 未被垃圾回收机制清除
    // ...
    }

> 弱引用对象的一大用处，就是作为缓存，未被清除时可以从缓存取值，一旦清除缓存就自动失效。

# FinalizationRegistry

> ES2021 引入了清理器注册表功能 FinalizationRegistry，用来指定目标对象被垃圾回收机制清除以后，所要执行的回调函数
