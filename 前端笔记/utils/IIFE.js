//了用IIFE封装 给dom元素注册事件函数，并且判断浏览器兼容
const addEvent = (function (){
    if(window.addEventListener){
        return function(ele, eventName, handle){
            ele.addEventListener(eventName,handle)
        }
    }else if (window.attachEvent){
        return function(ele, eventName, handle){
            ele.attachEvent('on',eventName, handle)
        }
    }else{
        return function(ele, eventName, handle){
            ele['on'+ eventName] = handle
        }
    }
})()
