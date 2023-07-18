class app {
    constructor(){
        this.name = "lihua"
        this.sex = "man"
    }
    get a(){
        console.log("get")
        return "name"+ this.name
    }
}

let a = new app()

let b = a.a

console.log(b) 