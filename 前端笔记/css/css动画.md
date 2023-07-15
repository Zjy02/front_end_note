# css 动画

## animation

> animation 是这八个属性的缩写: animation-duration, animation-timing-function, animation-delay,
> animation-literation-count, animation-direction, animation-fill-mode, animation-play-state, animation-name

1. animation-duration
   指定动画完成一个周期所需要时间，单位秒（s）或毫秒（ms），默认是 0。

2. animation-timing-function
   指定动画计时函数，即动画的速度曲线，默认是 "ease"。

3. animation-delay
   指定动画延迟时间，即动画何时开始，默认是 0。

4. animation-iteration-count
   指定动画播放的次数，默认是 1。

5. animation-direction
   指定动画播放的方向。默认是 normal。

6. animation-fill-mode
   指定动画填充模式。默认是 none。

7. animation-play-state
   指定动画播放状态，正在运行或暂停。默认是 running。

8. animation-name
   指定 @keyframes 动画的名称。

## 关键帧

> css 动画也称为关键帧动画，用@keyframes 定义关键帧
> 帧的概念，想必大家很清楚，比如电影就是一帧帧图片在播放，利用图像在人脑中短时间停留来形成动态效果。CSS 动画也是利用这个原理。不过开发者不需要给出每一帧的定义。只需要定义一些关键的帧即可。因为其余的帧，浏览器会根据计时函数插值计算出来。

    @keyframes rotate {
        to {
            transform:rotate(360deg)
        }
        from {
            transform:rotate(0deg)
        }
    }

    from 表示最开始的那一帧也可以用 0% 表示，to 表示结束时的那一帧也可以用 100% 表示。

> 定义完关键帧后使用 animation: rotate 2s，也可以 animation-name:rotate; animation-duration:2s;

> animation-timing-function 用来定义动画的速度默认为 ease
> animation-timing-function 常见值有：linear(匀速)、ease(动画在中间加速，在结束时减速)、ease-in(随着动画属性的变化逐渐加速，直至完成)、ease-out(动画的进行逐渐减速。)、ease-in-out(动画属性一开始缓慢变化，随后加速变化，最后再次减速变化),
> 这些值其实都是 cubic-bezier(n,n,n,n) 的特例。它们被称为贝塞尔曲线,
> steps(n, <jumpterm>),可以在单个关键帧上指定时间函数。如果没有在关键帧上指定 animation-timing-function，则该关键帧将使用应用动画的元素的 animation-timing-function 属性相应的值

> animation-fill-mode 动画填充模式
> @keyframes 只是定义了动画过程中每一帧的值，然而在动画开始前和动画结束后，元素改处于什么状态呢？animation-fill-mode 说的就是这个事情。除了默认值 none 外，还有另外 3 个值：

    1. forwards，表示，动画完成后，元素状态保持为最后一帧的状态。
    2. backwards，表示，有动画延迟时，动画开始前，元素状态保持为第一帧的状态。
    3. both，表示上述二者效果都有

> animation-delay 设置延迟时间，可以为负值，负延迟表示动画仿佛开始前就已经运行过了那么长时间。

> 负延迟表示动画仿佛开始前就已经运行过了那么长时间。

> animation-play-state 表示动画播放状态,默认值 running 表示播放， paused 表示暂停

> animation-iteration-count 表示动画播放次数,无限播放时使用 infinite

> animation-direction，它的意思说指定动画按照指定顺序来播放 @keyframes 定义的关键帧

    normal 默认值。
    reverse 表示动画反向播放。
    alternate 表示正向和反向交叉进行。
    alternate-reverse 表示反向和正向交叉进行。

## transition

> 字面意思上来讲，就是元素从这个属性(color)的某个值(red)过渡到这个属性(color)的另外一个值(green)，这是一个状态的转变，需要一种条件来触发这种转变，比如我们平时用到的:hoever、:focus、:checked、媒体查询或者 JavaScript。

    #box {
      height: 100px;
      width: 100px;
      background: green;
      transition: transform 1s ease-in 1s;
    }

    #box:hover {
      transform: rotate(180deg) scale(.5, .5);
    }

- 不足：

      需要事件触发，所以没法在网页加载时自动发生
      是一次性的，不能重复发生，除非一再触发
      只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态
      一条transition规则，只能定义一个属性的变化，不能涉及多个属性。

> 语法 ：transition: property duration timing-function delay;

    transition-property 规定设置过渡效果的 CSS 属性的名称


    transition-duration 规定完成过渡效果需要多少秒或毫秒


    transition-timing-function 规定速度效果的速度曲线


    transition-delay 定义过渡效果何时开始
