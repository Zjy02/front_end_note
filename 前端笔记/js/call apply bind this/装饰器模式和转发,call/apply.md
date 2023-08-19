## 装饰器模式和转发，call/apply

### 透明缓存
> 有一个函数 slow(x),传入的参数不变时每次调用都是的那会一样的结果，经常调用时，我们希望能将结果缓存下来
> 避免重新计算花费额外的时间，但是又不希望将这个功能加在这个函数里面，我们可以将函数包装起来

      function slow(x){
        //....
        console.log(x)
        return x
      }

      function cachingDecorator (func){
        let cache = new Map()

        return function (x){
          if(cache.has(x)){
            return cache.get(x)
          }

          let result = func(x)
          cache.set(x,result)
          return result
        }
      }

      slow = cachingDecorator(slow)
  
> 该方法不使用于对象方法