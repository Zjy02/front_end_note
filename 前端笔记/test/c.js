// let user = {
//   name: 'key',
//   say: function (params) {
//     console.log(this.name + ' ' + params)
//   }
// }

// let foo = user.say.bind(user, 'bind')

// user = {
//   say: function () {
//     console.log('1')
//   }
// }

// foo()

let arr = [1, 2, 3, 4]

let newarr = [5, 6, 7]

arr.push.apply(arr, newarr)
console.log(arr);