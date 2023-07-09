# 生命周期

    beforeCreate	组件实例被创建之初
    created	组件实例已经完全创建
    beforeMount	组件挂载之前
    mounted	组件挂载到实例上去之后
    beforeUpdate	组件数据发生变化，更新之前
    updated	组件数据更新之后
    beforeDestroy	组件实例销毁之前
    destroyed	组件实例销毁之后
    activated	keep-alive 缓存的组件激活时
    deactivated	keep-alive 缓存的组件停用时调用
    errorCaptured	捕获一个来自子孙组件的错误时被调用

# beforeCreate -> created

    初始化vue实例，进行数据观测

# created

    完成数据观测，属性与方法的运算，watch、event事件回调的配置
    可调用methods中的方法，访问和修改data数据触发响应式渲染dom，可通过computed和watch完成数据计算
    此时vm.$el 并没有被创建

# created -> beforeMount

    判断是否存在el选项，若不存在则停止编译，直到调用vm.$mount(el)才会继续编译
    优先级：render > template > outerHTML
    vm.el获取到的是挂载DOM的

# beforeMount

    在此阶段可获取到vm.el
    此阶段vm.el虽已完成DOM初始化，但并未挂载在el选项上

# beforeMount -> mounted

此阶段 vm.el 完成挂载，vm.$el 生成的 DOM 替换了 el 选项所对应的 DOM

# mounted

vm.el 已完成 DOM 的挂载与渲染，此刻打印 vm.$el，发现之前的挂载点及内容已被替换成新的 DOM

# beforeUpdate

更新的数据必须是被渲染在模板上的（el、template、render 之一）
此时 view 层还未更新
若在 beforeUpdate 中再次修改数据，不会再次触发更新方法

# updated

完成 view 层的更新
若在 updated 中再次修改数据，会再次触发更新方法（beforeUpdate、updated）

# beforeDestroy

实例被销毁前调用，此时实例属性与方法仍可访问

# destroyed

完全销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器
并不能清除 DOM，仅仅销毁实例
