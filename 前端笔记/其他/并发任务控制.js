function timeOut (time){
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve()
        }, time);
    })
}

class SuperTask {
    constructor(limite = 2){
        this.tasks = []
        this.limite = limite
        this.currentTask = 0
    }

    add(task){
        return new Promise((resolve,reject)=>{
            this.tasks.push({task,reject,resolve})
            this._run()
        })
    }
    _run(){
        while(this.currentTask < this.limite && this.tasks.length>0){
            const {task,reject,resolve} = this.tasks.shift()
            this.currentTask++
            task().then(resolve,reject).finally(()=>{
                this.currentTask--
                this._run()
            })
        }
    }
}

const superTask = new SuperTask()

function addTask(time,name){
    superTask.add(()=> timeOut(time))
    .then(()=>{
        console.log(`任务${name}完成`)
    })
}

addTask(1000,1)
addTask(2000,2)
addTask(3000,3)
addTask(1000,4)
addTask(1000,5)
addTask(1000,6)