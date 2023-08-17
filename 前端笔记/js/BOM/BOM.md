# BOM

> bom 就是 Borrow object Model 浏览器对象模型

    常用api接口
    window.location.assign('需要跳转的页面')
    window.reload() 刷新页面
    window.history.forward() 前进类似网页的前进功能 但是需要在前进有网页的情况下
    window.back()后退 同理
    浏览器信息 window.navigator
    appVersion 浏览器当前版本信息

1. 让浏览器出现一个弹出框(alert/prompt/confirm)
   alert() 可以吧需要的数据弹窗输出
   prompt() 可以获取到用户输入的信息
   confirm() 返回布尔值 点击确定返回 true 取消返回 false

   > BOM 的核心就是 window 对象
   > window 是浏览器内置的一个对象, 里面包含着操作浏览器的方法

2. 获取浏览器窗口的尺寸(包含滚动条)

   window.innerHeight() 获取浏览器高度
   window.innerWidth() 获取浏览器宽度

# cookie

    只能储存字符串，且格式固定

    js 'key=value'


    储存大小有限制

    4kb左右


    存储有时效性

    默认是会话级别 就是关闭浏览器便会清除
    但是可以手动设置过期时间


    跟随前后端请求

    只要是有cookie缓存 都会跟随
    和后端交互时便会跟随


    可以被后端操作
    储存依赖域名

    不能跨域名通讯
    只能在当前域名下使用 也就是存储域名下可以使用

3.浏览器的地址信息 (location)

    location.href 页面跳转
    window.location.href = 'https://www.baidu.com'


    location.reload 页面刷新

浏览器的地址信息 (location)

## window onload 事件

    在界面所有东西加载完才会执行 window.onload事件

    在浏览器中, 把 JS 写在 head 中, JS 在加载时 DOM 还没加载完, 可能会导致获取 DOM 时出现问题, 但是如果把代码放在 onload 事件中, 则不会出现问题
    如果把 JS 写在 body 底部, 则写不写 onload 都一样

## window onscroll 事件

    当页面滑动条触发滚动时触发的事件
    window.onscroll = function() {
        //触发后的执行的代码
    }

## 浏览器滚动的距离

    浏览器的滚动距离
    浏览器的内容可以滚动, 那么我们就可以获取到浏览器滚动的距离
    但是需要思考一个问题
    浏览器真的滚动了吗?
    其实浏览器没有滚动, 一直在那里, 滚动的是浏览器的页面
    所以说: 其实浏览器没动, 只不过页面向上走了
    所以这个已经不能单纯的算是浏览器的内容了, 而是我们页面的内容
    所以不再是使用 window 对象了, 而是使用 document 对象

### scrollTop 页面向上滑动的距离

    document.body.scrollTop 没有 :！DOCTYPE
    document.documentElement.scrollTop
    页面声明：！DOCTYPE的时候只能用document.documentElement.scrollTop

### scrollLeft

    获取页面向左滚动的距离
    document.body.scrollLeft 同理
    document.documentElement.scrollLeft

<a href="https://juejin.cn/post/6860890529148698632#heading-11">更多</a>

## 常用 DOM Api

https://segmentfault.com/a/1190000009588427
https://blog.csdn.net/qq_52736131/article/details/123563321