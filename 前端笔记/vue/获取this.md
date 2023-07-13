## this

> Vue2 中每个组件里使用 this 都指向当前组件实例，this 上还包含了全局挂载的东西、路由、状态管理等啥啥都有

> 而 Vue3 组合式 API 中没有 this，如果想要类似的用法，有两种，一是获取当前组件实例，二是获取全局实例，如下自己可以去打印出来看看

    import { getCurrentInstance } from 'vue'

    // proxy 就是当前组件实例，可以理解为组件级别的 this，没有全局的、路由、状态管理之类的
    const { proxy, appContext } = getCurrentInstance()

    // 这个 global 就是全局实例
    const global = appContext.config.globalProperties
