//防抖
//触发事件后，time秒后执行事件，反复点击，以最后的一次触发为基础，重新计时
function debounce(event,time){
        let timer = null
        return function (...args) {
            clearInterval(timer)
            timer = setTimeout(() => {
                event.apply(this,args)
            }, time);
        }
}

//用法
let sum = (params)=>{
    console.log(params)
}
//设置一秒
let onClick = debounce(sum,1000)
//运行
onClick('cctv')

// 先执行一次 在等待
//flag 为true则开启，默认为关闭，关闭更上面的效果一样
function debounce (event,time,flag){
    debugger
    let timer = null
    return function(...args){
        clearInterval(timer)
        if(flag && !timer){
            event.apply(this,args)
            timer = 1
        }else{
            timer = setTimeout(() => {
                event.apply(this, args)
            }, time)
        }
        
    }
}