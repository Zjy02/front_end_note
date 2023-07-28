// 在这写代码
Object.prototype[Symbol.iterator] = function* (){
    return yield* Object.values(this)
}



const [a,b] = {a:1,b:2}
//TypeError: {(intermediate value)(intermediate value)} is not iterable
// 让代码不报错，并且不修改代码


console.log(a,b)