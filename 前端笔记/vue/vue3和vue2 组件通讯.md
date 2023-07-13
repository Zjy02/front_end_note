# vue3 组件通讯方式

1. props
2. $emit
3. expore / ref
4. $attrs
5. v-model
6. provide / inject
7. Vuex
8. mitt

## props

> 方式一：setup 方法写法

    <child :msg1='msg1' :msg2></child>
    <script>
    import child from "./child.vue"
    import { ref, reactive } from "vue"
    export default {
    data(){
        return {
            msg1:"这是传级子组件的信息1"
        }
    },
    setup(){
        // 创建一个响应式数据

        // 写法一 适用于基础类型  ref 还有其他用处，下面章节有介绍
        const msg2 = ref("这是传级子组件的信息2")

        // 写法二 适用于复杂类型，如数组、对象
        const msg2 = reactive(["这是传级子组件的信息2"])

        return {
            msg2
        } } }
    </script>
    child.vue
    <script>
    export default {
        props: ["msg1", "msg2"],// 如果这行不写，下面就接收不到
        setup(props) {
            console.log(props) // { msg1:"这是传给子组件的信息1", msg2:"这是传给子组件的信息2" }
        },}
    </script>

> 方式二 setup 语法糖写法

    //省略父组件
    child.vue

    <script setup>
    // 不需要引入 直接使用
    // import { defineProps } from "vue"
    const props = defineProps({
        // 写法一
        msg2: String
        // 写法二
        msg2:{
            type:String,
            default:""
        }
    })
    console.log(props) // { msg2:"这是传级子组件的信息2" }
    </script>

> 如果父组件是 setup()，子组件 setup 语法糖写法的话，是接收不到父组件里 data 的属性，只能接收到父组件里 setup 函数里传的属性

> 如果父组件是 setup 语法糖写法，子组件 setup()方法写法，可以通过 props 接收到 data 和 setup 函数里的属性，但是子组件要是在 setup 里接收，同样只能接收到父组件中 setup 函数里的属性，接收不到 data 里的属性

## $emit

    // Child.vue 派发

    <template>
        // 写法一
        <button @click="emit('myClick')">按钮</buttom>
        // 写法二
        <button @click="handleClick">按钮</buttom>
    </template>
    <script setup>

    // 方法一 适用于Vue3.2版本 不需要引入
    // import { defineEmits } from "vue"
    // 对应写法一
    const emit = defineEmits(["myClick"])
    // 对应写法二
    const handleClick = ()=>{
        emit("myClick", "这是发送给父组件的信息")
    }

    // 方法二 不适用于 Vue3.2版本，该版本 useContext()已废弃
    import { useContext } from "vue"
    const { emit } = useContext()
    const handleClick = ()=>{
        emit("myClick", "这是发送给父组件的信息")
    }
    </script>

    // Parent.vue 响应
    <template>
        <child @myClick="onMyClick"></child>
    </template>
    <script setup>
        import child from "./child.vue"
        const onMyClick = (msg) => {
            console.log(msg) // 这是父组件收到的信息
        }
    </script>

## expose / ref

    <script setup>
        // 方法一 不适用于Vue3.2版本，该版本 useContext()已废弃
        import { useContext } from "vue"
        const ctx = useContext()
        // 对外暴露属性方法等都可以
        ctx.expose({
            childName: "这是子组件的属性",
            someMethod(){
                console.log("这是子组件的方法")
            }
        })

        // 方法二 适用于Vue3.2版本, 不需要引入
        // import { defineExpose } from "vue"
        defineExpose({
            childName: "这是子组件的属性",
            someMethod(){
                console.log("这是子组件的方法")
            }
        })
    </script>

    // Parent.vue 注意 ref="comp"
    <template>
    <child ref="comp"></child>
    <button @click="handlerClick">按钮</button>
    </template>

    <script setup>
        import child from "./child.vue"
        import { ref } from "vue"
        const comp = ref(null)
        const handlerClick = () => {
            console.log(comp.value.childName) // 获取子组件对外暴露的属性
            comp.value.someMethod() // 调用子组件对外暴露的方法
        }
    </script>

> 在 setup(props,context)函数中通过 context 拿到 emit, context.emit('myClick')

## attrs

> attrs：包含父作用域里除 class 和 style 除外的非 props 属性集合

    <child :msg1="msg1" :msg2="msg2" title="3333"></child>
    <script setup>
        import child from "./child.vue"
        import { ref, reactive } from "vue"
        const msg1 = ref("1111")
        const msg2 = ref("2222")
    </script>

    <script setup>
        import { defineProps, useContext, useAttrs } from "vue"
        // 3.2版本不需要引入 defineProps，直接用
        const props = defineProps({
            msg1: String
        })

        // 方法一 不适用于 Vue3.2版本，该版本 useContext()已废弃
        const ctx = useContext()
        // 如果没有用 props 接收 msg1 的话就是 { msg1: "1111", msg2:"2222", title: "3333" }
        console.log(ctx.attrs) // { msg2:"2222", title: "3333" }

        // 方法二 适用于 Vue3.2版本
        const attrs = useAttrs()
        console.log(attrs) // { msg2:"2222", title: "3333" }
    </script>

## v-model

    <child v-model:key="key" v-model:value="value"></child>
    <script setup>
        import child from "./child.vue"
        import { ref, reactive } from "vue"
        const key = ref("1111")
        const value = ref("2222")
    </script>

    // Child.vue
    <template>
        <button @click="handlerClick">按钮</button>
    </template>
    <script setup>

        // 方法一  不适用于 Vue3.2版本，该版本 useContext()已废弃
        import { useContext } from "vue"
        const { emit } = useContext()

        // 方法二 适用于 Vue3.2版本，不需要引入
        // import { defineEmits } from "vue"
        const emit = defineEmits(["key","value"])

        // 用法
        const handlerClick = () => {
            emit("update:key", "新的key")
            emit("update:value", "新的value")
        }
    </script>

## provide / inject

> provide / inject 为依赖注入
> provide: 可以让我们指定想要提供给后代组件的数据
> inject:在任何后代组件中接收想要添加在这个组件上的数据，不管组件嵌套多深都可以直接拿来用

    // Parent.vue
    <script setup>
        import { provide } from "vue"
        provide("name", "沐华")
    </script>

    // Child.vue
    <script setup>
        import { inject } from "vue"
        const name = inject("name")
        console.log(name) // 沐华
    </script>

> provide/inject 采用消息的订阅发布，遵循 vue 单项数据流，数据在哪，修改只能在哪，不能在数据传递处修改数据，容易造成状态不可预测。
> 数据在哪，修改只能在哪，不能在数据传递处修改数据，容易造成状态不可预测。
> 使用 readonly 只读函数，在接收处无法改变

    import { readonly } from "vue"
    let info = readonly('只读info值')
    provide('info',info)

> 在子组件修改值的时候，会有一个只读提醒。

> 如果要修改数据，最好还是在 provide 处修改

    const change = (newValue)=>{
        info.value = newValue
    }

    provide('info',info)
    provide('change',change)

    let hand = inject('change')
    hand(newValue)

## Vuex/pinia

> 省略

## mitt

> Vue3 中没有 EvenBus 跨组件通讯，但是现在有了一个替代的方案 mitt.js，原理还是 EventBus

> 安装 npm install mitt -S

> 可以封装成一个 ESM 模块，对外暴露一个实例

    mitt.js
    import mitt from 'mitt'
    const mitt = mitt()
    export default mitt

> 也可与挂在到全局

    import mitt from 'mitt'
    const app = createApp(App)
    // vue3.x的全局实例，要挂载在config.globalProperties上
    app.config.globalProperties.$mitt = new mitt()
    //使用this.$mitt

> on 监听 emit 触发

    组件A
    import mitt from './mitt'
    const handleClick = () => {
        mitt.emit('handleChange')
    }
    </script>

    // 组件 B
    <script setup>
    import mitt from './mitt'
    import { onUnmounted } from 'vue'

    const someMethed = () => { ... }
    mitt.on('handleChange',someMethed)

    //通过*监听所有任务
    mitt.on('*', data => {
      console.log('EventBus come in', data)
    })

    onUnmounted(()=>{
        //移除事件
        mitt.off('handleChange',someMethed)

         // 移除全部事件
        mitt.all.clear()
    })
    </script>

# Vue2 组件通讯方式

> Vue2.x 组件通信共有 12 种

- props
- $emit / v-on
- .sync
- v-model
- ref
- $children / $parent
- $attrs / $listeners
- provide / inject
- EventBus
- Vuex
- $root
- slot

> 父子组件通信可以用：

    props
    $emit / v-on
    $attrs / $listeners
    ref
    .sync
    v-model
    $children / $parent

> 兄弟组件通信可以用：

    EventBus
    Vuex
    $parent

> 跨层级组件通信可以用：

    provide/inject
    EventBus
    Vuex
    $attrs / $listeners
    $root

## props

> 子组件接收到数据之后，不能直接修改父组件的数据。会报错，所以当父组件重新渲染时，数据会被覆盖。如果子组件内要修改的话推荐使用 computed

    // Parent.vue 传送
    <template>
        <child :msg="msg"></child>
    </template>

    // Child.vue 接收
    export default {
    // 写法一 用数组接收
    props:['msg'],
    // 写法二 用对象接收，可以限定接收的数据类型、设置默认值、验证等
    props:{
        msg:{
            type:String,
            default:'这是默认数据'
        }
    },
    mounted(){
        console.log(this.msg)
    },
    }

## sync

> 可以帮我们实现父组件向子组件传递的数据 的双向绑定，所以子组件接收到数据后可以直接修改，并且会同时修改父组件的数据

    // Parent.vue
    <template>
        <child :page.sync="page"></child>
    </template>
    <script>
    export default {
        data(){
            return {
                page:1
            }
        }
    }

    // Child.vue
    export default {
        props:["page"],
        computed(){
            // 当我们在子组件里修改 currentPage 时，父组件的 page 也会随之改变
            currentPage {
                get(){
                    return this.page
                },
                set(newVal){
                    this.$emit("update:page", newVal)
                }
            }
        }
    }
    </script>

## v-model

> 和 .sync 类似，可以实现将父组件传给子组件的数据为双向绑定，子组件通过 $emit 修改父组件的数据

    // Parent.vue
    <template>
        <child v-model="value"></child>
    </template>
    <script>
    export default {
        data(){
            return {
                value:1
            }
        }
    }

    // Child.vue
    <template>
        <input :value="value" @input="handlerChange">
    </template>
    export default {
        props:["value"],
        // 可以修改事件名，默认为 input
        model:{
            // prop:'value', // 上面传的是value这里可以不写，如果属性名不是value就要写
            event:"updateValue"
        },
        methods:{
            handlerChange(e){
                this.$emit("input", e.target.value)
                // 如果有上面的重命名就是这样
                this.$emit("updateValue", e.target.value)
            }
        }
    }
    </script>

## ref

> ref 如果在普通的 DOM 元素上，引用指向的就是该 DOM 元素;
> 如果在子组件上，引用的指向就是子组件实例，然后父组件就可以通过 ref 主动获取子组件的属性或者调用子组件的方法

    // Child.vue
    export default {
        data(){
            return {
                name:"沐华"
            }
        },
        methods:{
            someMethod(msg){
                console.log(msg)
            }
        }
    }

    // Parent.vue
    <template>
        <child ref="child"></child>
    </template>
    <script>
    export default {
        mounted(){
            const child = this.$refs.child
            console.log(child.name) // 沐华
            child.someMethod("调用了子组件的方法")
        }
    }
    </script>

## $emit / v-on

    // Child.vue 派发
    export default {
    data(){
        return { msg: "这是发给父组件的信息" }
    },
    methods: {
        handleClick(){
            this.$emit("sendMsg",this.msg)
        }
    },
    }
    // Parent.vue 响应
    <template>
        <child v-on:sendMsg="getChildMsg"></child>
        // 或 简写
        <child @sendMsg="getChildMsg"></child>
    </template>

    export default {
        methods:{
            getChildMsg(msg){
                console.log(msg) // 这是父组件接收到的消息
            }
        }
    }

## attrs / $listeners

> 多层嵌套组件传递数据时，如果只是传递数据，而不做中间处理的话就可以用这个，比如父组件向孙子组件传递数据时

> $attrs：包含父作用域里除 class 和 style 除外的非 props 属性集合。通过 this.$attrs 获取父作用域中所有符合条件的属性集合，然后还要继续传给子组件内部的其他组件，就可以通过 v-bind="$attrs"

> $listeners：包含父作用域里 .native 除外的监听事件集合。如果还要继续传给子组件内部的其他组件，就可以通过 v-on="$linteners"

    // Parent.vue
    <template>
        <child :name="name" title="1111" ></child>
    </template
    export default{
        data(){
            return {
                name:"沐华"
            }
        }
    }

    // Child.vue
    <template>
        // 继续传给孙子组件
        <sun-child v-bind="$attrs"></sun-child>
    </template>
    export default{
        props:["name"], // 这里可以接收，也可以不接收
        mounted(){
            // 如果props接收了name 就是 { title:1111 }，否则就是{ name:"沐华", title:1111 }
            console.log(this.$attrs)
        }
    }

## $children / $ parent

> $children：获取到一个包含所有子组件(不包含孙子组件)的 VueComponent 对象数组，可以直接拿到子组件中所有数据和方法等

> $parent：获取到一个父节点的 VueComponent 对象，同样包含父节点中所有数据和方法等

    // Parent.vue

    export default{
    mounted(){
    this.$children[0].someMethod() // 调用第一个子组件的方法
            this.$children[0].name // 获取第一个子组件中的属性
    }
    }

    // Child.vue
    export default{
    mounted(){
    this.$parent.someMethod() // 调用父组件的方法
            this.$parent.name // 获取父组件中的属性
    }
    }

## provide / inject

> provide 和 inject 传递的数据不是响应式的，也就是说用 inject 接收来数据后，provide 里的数据改变了，后代组件中的数据不会改变，除非传入的就是一个可监听的对象

    // 父组件
    export default{
        // 方法一 不能获取 this.xxx，只能传写死的
        provide:{
            name:"沐华",
        },
        // 方法二 可以获取 this.xxx
        provide(){
            return {
                name:"沐华",
                msg: this.msg // data 中的属性
                someMethod:this.someMethod // methods 中的方法
            }
        },
        methods:{
            someMethod(){
                console.log("这是注入的方法")
            }
        }
    }

    // 后代组件
    export default{
        inject:["name","msg","someMethod"],
        mounted(){
            console.log(this.msg) // 这里拿到的属性不是响应式的，如果需要拿到最新的，可以在下面的方法中返回
            this.someMethod()
        }
    }

## EvenBus

> EventBus 是中央事件总线，不管是父子组件，兄弟组件，跨层级组件等都可以使用它完成通信操作

> EvenBus 实质是: 创建一个 vue 实例，通过一个空的 vue 实例作为桥梁 实现 vue 组件间的通信。

> 引入方法

    //封装一个ESM模块
    // event-bus.js
    import Vue from 'vue'
    export const EventBus = new Vue()

    //挂载到全局

    // main.js
    Vue.prototype.$EventBus = new Vue()

> 使用

    // 在需要向外部发送自定义事件的组件内
    <template>
        <button @click="handlerClick">按钮</button>
    </template>
    import Bus from "./Bus.js"
    export default{
        methods:{
            handlerClick(){
                // 自定义事件名 sendMsg
                Bus.$emit("sendMsg", "这是要向外部发送的数据")
            }
        }
    }

    // 在需要接收外部事件的组件内
    import Bus from "./Bus.js"
    export default{
        mounted(){
            // 监听事件的触发
            Bus.$on("sendMsg", data => {
                console.log("这是接收到的数据：", data)
            })
        },
        beforeDestroy(){
            // 取消监听
            Bus.$off("sendMsg")
        }
    }

## Vuex

> 省略

## $root

> $root 可以拿到 App.vue 里的数据和方法

## slot

> 就是把子组件的数据通过插槽的方式传给父组件使用，然后再插回来

    // Child.vue
    <template>
        <div>
            <slot :user="user"></slot>
        </div>
    </template>
    export default{
        data(){
            return {
                user:{ name:"沐华" }
            }
        }
    }

    // Parent.vue
    <template>
        <div>
            <child v-slot="slotProps">
                {{ slotProps.user.name }}
            </child>
        </div>
    </template>
