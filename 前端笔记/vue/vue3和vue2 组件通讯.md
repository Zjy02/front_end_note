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
