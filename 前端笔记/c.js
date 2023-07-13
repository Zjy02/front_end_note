var reverse = function(x) {
    console.log(x)
    let ans = 0
    if( x == undefined || x== 0){
        return 0
    }
    let str = x.toString()
        console.log(typeof str)

    if( x < 0 ){
        let res = str.slice(1).split('').reverse().join('')
        ans = Number(res)
    }else{
        let res = str.split('').reverse().join('')
        ans = Number(res)
    }
        console.log(ans)
    function compare () {
        if( x < 0) ans  = Number('-'+ans)
        if( ans > Number(2**31) -1 && ans < -Number(2**31)) return 0
             console.log( "ans" + ans)
        return ans
    }
    return compare()

};
console.log(reverse(-1))