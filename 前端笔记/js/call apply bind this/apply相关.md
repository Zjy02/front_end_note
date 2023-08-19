## apply

> 如果想往数组中添加一个数组，push 只能添加一个个参数，concat 可以解决，但是 concat 会返回一个新数组。这是我们可以用 apply

    let arr = [1, 2, 3, 4]

    let newarr = [5, 6, 7]

    arr.push.apply(arr, newarr)
    
    console.log(arr);
    // [1,2,3,4,5,6,7]
