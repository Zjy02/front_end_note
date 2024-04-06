let a = [1, 2, 3, 4, 5, 5, 5, 6, 7, 8, 8, 9]

//去重
// 1 object
const unique = (array) => {
  var container = {}
  return array.filter(item => {
    if (container.hasOwnProperty(item)) {
      return false
    } else {
      container[item] = true
      return true
    }
  })
}
// console.log(unique(a));


// indexOf + filter 
const unique01 = array => array.filter((item, index) => array.indexOf(item) === index)
// console.log(unique01(a));


// set
const unique02 = array => [...new Set(array)]
// console.log(unique02(a));

// 排序

const unique03 = (array) => {
  array.sort((a, b) => a - b)
  let pre = 0;
  let result = []
  for (let i = 0; i < array.length; i++) {
    if (i = 0 || array[i] != array[pre]) {
      result.push(array[i])
    }
    pre = i
  }
}
// console.log(unique03(a));

// 去除重复值
// 如果出现重复次数，就把这个元素删除
const filterNonUnique = arr => arr.filter(i =>
  arr.indexOf(i) === arr.lastIndexOf(i)
)
// console.log(filterNonUnique(a))



// 扁平-------------
let flatArray = [1, 2, [1, 2, 4, 6, [22, 333, 44, [213, 221]]]]
// 递归
const flat = (array) => {
  let result = []
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      result = result.concat(flat(array[i]))
    } else {
      result.push(array[i])
    }
  }
  return result
}
// console.log(flat(flatArray));

// 使用reduce简化

const flatten = (array) => {
  return array.reduce((pre, item) => {
    return Array.isArray(item) ?
      pre.concat(flatten(item)) :
      pre.concat(item)
  }, [])
}
// console.log(flatten(flatArray));

// 指定深度扁平数组
const flattenDeep = (array, deep = 1) => {
  return array.reduce((pre, item) => {
    return Array.isArray(item) && deep > 1 ?
      pre.concat(flattenDeep(item, deep - 1)) :
      pre.concat(item)
  }, [])
}
// console.log(flattenDeep(flatArray));


// 最值----------------

// 使用reduce
let arrayMath = [1, 2, 3, 4, 5, 12, 3, 100, 666]

let result = arrayMath.reduce((pre, item) => {
  return Math.max(pre, item)
}, [])
// 简化
arrayMath.reduce((p, i) => Math.max(p, i))



// 使用Math.max
Math.max(...arrayMath)
Math.max.apply(arrayMath)


// 使用reduce实现map------------
let arrReduce = [1, 2, 3, 4, 5, 6, 7, 8]
Array.prototype.reduceMap = function (fnc) {
  return this.reduce((pre, item, index) => {
    pre.push(fnc.call(this, item, index, this))
    return pre
  }, [])
}
// arrReduce.reduceMap((item, index, arr) => {
//   return item + index
// })

// 使用reduce实现filter
Array.prototype.reduceFilter = function (fnc) {
  return this.reduce((pre, item, index) => {
    if (fnc.call(this, item, index, this)) {
      pre.push(item)
    }
    return pre
  }, [])
}

// console.log(arrReduce.reduceFilter((item, index, arr) => {
//   console.log(arr);
//   return item < 5
// }))