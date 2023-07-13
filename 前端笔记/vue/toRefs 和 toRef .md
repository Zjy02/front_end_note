# toRef 和 toRefs

> 这两共同点就是用来创建响应式的引用的，主要用来取出响应式对象里的属性，或者解构响应式对象，解构出来的属性值依然是响应式属性，如果不用这两直接解构的话是会丢失响应式效果的

> 主要就是方便我们使用直接变量 xxx，而不需要 data.xxx。并且我们修改 xxx 的时候也是直接修改源对象属性的

> 这两的区别：带 s 和不带 s，就是单数和复数嘛，意思就是取一个和取一堆

    <script setup>
    import { reactive, toRef, toRefs } from 'vue'

    const data = reactive({
        name: 'zjy',
        age: 18
    })

    // 这样虽然能拿到 name / age，但是会变成普通变量，没有响应式效果了
    const { name, age } = data

    // 取出来一个响应式属性
    const name = toRef(data, 'name')

    // 这样解构出来的所有属性都是有响应式的
    const { name, age } = toRefs(data)

    // 不管是 toRef 还是 toRefs，这样修改是会把 data 里的 name 改掉的
    // 就是会改变源对象属性，这才是响应式该有的样子
    name.value = 'zzzz'
    </script>
