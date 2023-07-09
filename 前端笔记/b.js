
//手写promise
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Mypromise {
#state = PENDING
#result = undefined
#handlers = []

    constructor(executor){

        const resolve = (data)=>{
            this.#changestate(FULFILLED,data)
        }

        const reject = (reason)=>{
           this.#changestate(REJECTED,reason)
        }

        try{
            executor(resolve,reject)
        }catch(err){
            reject(err)
        }
        
    }

#changestate(state,result){
    if(this.#state !== PENDING) return
            this.#state = state
            this.#result = result
            this.#run()
}

#run(){
    if(this.#state === PENDING) return
    while(this.#handlers.length){
        const { onFulfilled,onRjected,reject,resolve} = this.#handlers.shift()
        
        if(this.#state === FULFILLED){
            if(typeof onFulfilled === 'function'){
                onFulfilled(this.#result)
            }
        }
        else{
            if(typeof onRjected === 'function'){
                onRjected(this.#result)
            }
        }
    }

}

then(onFulfilled,onRjected) {
    return new Mypromise((resolve, reject)=>{

        this.#handlers.push({
            onFulfilled,
            onRjected,
            resolve,
            reject
        })

        this.#run()
    })
}   
}

const p = new Mypromise((resolve,reject)=>{
    setTimeout(() => {
        resolve(2)
    }, 1000);
    
})

p.then((res)=>{
    console.log(res+'wancheng')
},(err)=>{
    console.log(err+'shibai')
})

