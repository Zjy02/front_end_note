let a = [1,2,3,5]

// 第一种 直接置空

a = []

// 第二种 使用splice，注意splice会改变原来的数组

let b = a.splice(0) // b是删除的元素，不是修改后的数组

// 第三种 array.length 赋值为0、

a.length  = 0