
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

//本文件使用var是避免下文重新定义routes时报错
var routes = [
    {
        name:'index',
        path:'/',
        component: Index
    }
]

var router = VueRouter.createRouter({
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

    this.$router.push({name:'user',params:{userName:'education'}})
    //'/user/education'

    //path和 params不能写在一起，如果写在一起以path跳转
    this.$router.push({path:'/user',params:{userName:'education'}})
    // '/user'


    // 它的作用类似于 router.push，唯一不同的是，它在导航时不会向 history 添加新记录，
    // 正如它的名字所暗示的那样——它取代了当前的条目。
    this.$router.push({path:'/user',replace:true})
    // 相当于
    this.$router.replace({ path: '/home' })


// 该方法采用一个整数作为参数，表示在历史堆栈中前进或后退多少步，类似于
    window.history.go(n)

    //向前移动一条记录
    router.go(1)
    //后退
    router.go(-1)
    //如果没有那么多静默失败
    router.go(100)

    //router.push、router.replace 和 router.go 
    // 是 window.history.pushState、window.history.replaceState 和 window.history.go 的翻版，
    // 它们确实模仿了 window.history 的 API。


    //路由命名
    // 没有硬编码的 URL
    // params 的自动编码/解码。
    // 防止你在 url 中出现打字错误。
    // 绕过路径排序（如显示一个）
    var routes = [
    {
        path: '/user/:username',
        name: 'user',
        component: User,
    },
    ]
    
    //使用router-link来跳转
    // <router-link :to="{ name: 'user', params: { username: 'erina' }}">
    //     User
    // </router-link>

    //等价于
    router.push({ name: 'user', params: { username: 'erina' } })

    
    
    //命名视图
    //使用多个router-view来展示页面
    //没有定义name，默认default
    {/* <router-view class="view left-sidebar" name="LeftSidebar"></router-view>
    <router-view class="view main-content"></router-view>
    <router-view class="view right-sidebar" name="RightSidebar"></router-view> */}

        var router = createRouter({
            history: createWebHashHistory(),
            routes: [
                {
                path: '/',
                components: {
                    default: Home,
                    // LeftSidebar: LeftSidebar 的缩写
                    LeftSidebar,
                    // 它们与 `<router-view>` 上的 `name` 属性匹配
                    RightSidebar,
                },
                },
            ],
            })



//重定向
// 重定向是指当用户访问 /home 时，URL 会被 / 替换，然后匹配成 /
var routes = [{ path: '/home', redirect: '/' }]
//可以是命名路由
var routes = [{ path: '/home', redirect: { name: 'homepage' } }]
//也可以是一个方法
var routes = [
  {
    // /search/screens -> /search?q=screens
    path: '/search/:searchText',
    redirect: to => {
      // 方法接收目标路由作为参数
      // return 重定向的字符串路径/路径对象
      return { path: '/search', query: { q: to.params.searchText } }
    },
  },
  {
    path: '/search',
    // ...
  },
]
//此时在/home用路由守卫时是不起效果的，应为路由应用在其目标上
//在写 redirect 的时候，可以省略 component 配置，因为它从来没有被直接访问过，所以没有组件要渲染
//唯一的例外是嵌套路由：如果一个路由记录有 children 和 redirect 属性，它也应该有 component 属性


//相对重定向

        var routes = [
            {
                // 将总是把/users/123/posts重定向到/users/123/profile。
                path: '/users/:id/posts',
                redirect: to => {
                // 该函数接收目标路由作为参数
                // 相对位置不以`/`开头
                // 或 { path: 'profile'}
                return 'profile'
                },
            },
            ]

//别名
// 将 / 别名为 /home，意味着当用户访问 /home 时，URL 仍然是 /home，但会被匹配为用户正在访问 /。
var routes = [
    {
         path: '/', 
         component: Homepage, 
         alias: '/home' 
        }
]

// 通过别名，你可以自由地将 UI 结构映射到一个任意的 URL，而不受配置的嵌套结构的限制

// 别名以 / 开头，以使嵌套路径中的路径成为绝对路径。你甚至可以将两者结合起来，用一个数组提供多个别名：

var routes = [
  {
    path: '/users',
    component: UsersLayout,
    children: [
      // 为这 3 个 URL 呈现 UserList
      // - /users
      // - /users/list
      // - /people
      { path: '', component: UserList, alias: ['/people', 'list'] },
    ],
  },
]
//如果你的路由有参数，请确保在任何绝对别名中包含它们：
var routes = [
  {
    path: '/users/:id',
    component: UsersByIdLayout,
    children: [
      // 为这 3 个 URL 呈现 UserDetails
      // - /users/24
      // - /users/24/profile
      // - /24
      { path: 'profile', component: UserDetails, alias: ['/:id', ''] },
    ],
  },
]

//将props传给路由组件
var User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
var routes = [{ path: '/user/:id', component: User }]
//替换成
const User = {
  // 请确保添加一个与路由参数完全相同的 prop 名
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
var routes = [{ path: '/user/:id', component: User, props: true }]
//布尔模式
// 当 props 设置为 true 时，route.params 将被设置为组件的 props

//命名视图传props
var routes = [
  {
    path: '/user/:id',
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false }
  }
]
//对象模式
// 当 props 是一个对象时，它将原样设置为组件 props。当 props 是静态的时候很有用。
    var routes = [
        {
            path: '/promotion/from-newsletter',
            component: Promotion,
            props: { newsletterPopup: false }
        }
    ]

//函数模式
//你可以创建一个返回 props 的函数。这允许你将参数转换为其他类型，将静态值与基于路由的值相结合等等

    const routes = [
        {
            path: '/search',
            component: SearchUser,
            props: route => ({ query: route.query.q })
        }
    ]

// URL /search?q=vue 将传递 {query: 'vue'} 作为 props 传给 SearchUser 组件
// 请尽可能保持 props 函数为无状态的，因为它只会在路由发生变化时起作用。
// 如果你需要状态来定义 props，请使用包装组件，这样 vue 才可以对状态变化做出反应




//不同的历史模式

//hash模式
// hash 模式是用 createWebHashHistory() 创建的：

// 它在内部传递的实际 URL 之前使用了一个哈希字符（#）。由于这部分 URL 从未被发送到服务器，
// 所以它不需要在服务器层面上进行任何特殊处理。不过，它在 SEO 中确实有不好的影响。如果你担心这个问题，可以使用 HTML5 模式。


//Html5模式
// 用 createWebHistory() 创建 HTML5 模式，推荐使用这个模式：
// 如果没有适当的配置服务器设置用户在访问 https://example.com/user/id时，
// 会等到一个404错误，这是需要在服务器添加一个简单的回退路由如果 URL 不匹配任何静态资源，
// 它应提供与你的应用程序中的 index.html 相同的页面


//服务器示例

// nginx
// location / {
//   try_files $uri $uri/ /index.html;
// }


// 原生node


    const http = require('http')
    const fs = require('fs')
    const httpPort = 80

    http
    .createServer((req, res) => {
        fs.readFile('index.html', 'utf-8', (err, content) => {
        if (err) {
            console.log('We cannot open "index.html" file.')
        }

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
        })

        res.end(content)
        })
    })
    .listen(httpPort, () => {
        console.log('Server listening on: http://localhost:%s', httpPort)
    })
//Express+nodejs 考虑使用 connect-history-api-fallback 














































