# 获取 dom

## vue2

> 使用 this.$refs

## vue3

    <button ref="btn">click</button>

    <script>
        import{ ref,getCurrentInstance} from 'vue'
        //方法一
        const btn = ref(null)

        //方法二
        const { proxy} = getCurrentInstance()
        console.log(proxy.$refs.btn)
    </script>
