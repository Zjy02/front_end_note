var maxArea = function(height) {
    if( height.length == 2){
        return Math.min(height[1],height[0])*1
    }
    let L = 0
    let R = height.length -1 
    let res = 0
    while( L<= R){
        let m = Math.min(height[L],height[R]) * (R - L)
        res = Math.max(res,m)
        if( height[L] <= height[R]) {L++;continue}
        if( height[L] > height[R]) {R--;continue}
    }
    return res
};
console.log(maxArea([1,8,6,2,5,4,8,3,7]))