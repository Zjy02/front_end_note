
<div>
{/* 
    router-link是一个组件，to属性是跳转的链接
    <router-link/> 将呈现一个带有正确 href属性的a标签
*/}    
    <router-link to='/'></router-link>

{/*
    路由出口
    路由匹配的组件将会在这里渲染
*/}
    <router-view></router-view>
</div>

//路由使用

const routes = [
    {
        name:'index',
        path:'/',
        component: Index
    }
]

const router = VueRouter.createRouter({
    history:VueRouter.createWebHashHistory(),
    routes
})

const app = Vue.createApp({})

app.use(router)
app.mount('#app')

//通过调用 app.use(router)，我们会触发第一次导航且可以在任意组件中以 this.$router 的形式访问它，并且以 this.$route 的形式访问当前路由：

this.push('/login')


{/*
    带参数的动态luyoupipei
*/}

// router.js

let ruotes = [
    {
        path:'user/:userName/age/:ageNums'
    }
]

this.router.push('user/tom/age/20')

// this.params 为 { userName:'tom', ageNum:'20'}
// this.params.ageNum  => 20

//在匹配不同参数时=> user/tom 跳转到 user/jack时，组件不会销毁创建，而是复用，所以生命周期mount不用被调佣
//可以使用watch 来监听this.$router.params上面的属性

//     created() {
//     this.$watch(
//       () => this.$route.params,
//       (toParams, previousParams) => {
//         // 对路由变化做出响应...
//       })
//   }

  //或者使用 路由守卫
    // beforeRouteUpdate(to, from) {
    //     // 对路由变化做出响应...
    //     this.userData = await fetchUser(to.params.id)
    // }