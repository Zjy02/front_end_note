# Script标签的async和defer

    之前有写过HTML页面渲染过程，知道了JavaScript是会阻塞DOM解析的，所以我们会把script标签放到底部防止阻塞HTML解析。其实script还有两个属性，async和defer，也是可以使得JavaScript和DOM和css同步加载。
    说着两个属性之前先简单说一下DOMContentLoaded和load。

    DOMContentLoaded：DOM内容加载完毕，页面会展示内容，但是图片、音视频等资源还未加载就触发DOMContentLoaded事件。
    Load：在DOMContentLoaded触发之后触发，这时候图片、音视频等资源也已经加载完毕了。
    知道了这两个事件之后，我们来说说async和defer。这两个都是用来控制外部脚本文件的，就是使用script引入，有src属性，在script标签没有src属性的内联脚本是无效的。这两个都不会阻塞HTML的解析。

    Defer：开启新的线程下载脚本，使HTML解析完成后执行。如果多个脚本同时生命defer，会按顺序下载和执行，同时会在DOMContentLoaded和load之前执行。意思就是如果HTML解析完成了，脚本还没加载完成，那么一定会等脚本加载完成了才触发DOMContentLoaded。（网上有说defer也不一定按顺序，这个不知道什么情况下不按顺序）
    
    Async：H5新增属性，也是用于异步加载脚本，下载完毕立即执行。有多个脚本使用async的时候，不能保证顺序，如果脚本直接有依赖，是不能使用这个属性。Async会在load之前执行，但是不保证和DOMContentLoaded的执行顺序。
    另外说一个跟HTML渲染的小知识点，我们在网络很卡的情况下，标签出来了，样式没有出来，之前说的是DOM和css构建出render树才能渲染页面，然后就觉得很矛盾，突然看见有文章说现代浏览器为了更好的用户体验，渲染引擎尽快渲染内容，现在已经不会等所有HTML解析之前开始构建和布局render树，部分内容将提前渲染，就是说并不是一定要DOM和css都解析加载完成构建render树之后才渲染页面。

