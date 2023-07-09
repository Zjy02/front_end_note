var threeSum = function(nums) {
    let res = []
    nums.sort( (a,b) =>a - b)
    let len = nums.length
    if(nums == null && len < 3) return res
    for( let i = 0 ; i < len; i++){
        if(nums[i] > 0 ) return res
        if(i > 0 && nums[i] == nums[i+1]) continue
        let left = i+1
        let right = len-1
        while(left < right){
            let sum = nums[i] + nums[left] + nums[right]
            if(sum == 0) {
                res.push([nums[i],nums[left],nums[right]])
                while( left < right && nums[left] === nums[left + 1 ]) left++
                while( left < right && nums[right] === nums[right - 1]) right--
            }
            else if (sum > 0) right--
            else if (sum < 0) left++
        }

    }
    return res
};