# 确定包含块

> 确定一个元素的包含块的过程完全依赖于这个元素的 position 属性：

1. 如果 position 属性为 static、relative 或 sticky，包含块可能由它的最近的祖先块元素（比如说 inline-block, block 或 list-item 元素）的内容区的边缘组成，也可能会建立格式化上下文 (比如说 a table container, flex container, grid container, 或者是 the block container 自身)。

2. 如果 position 属性为 absolute ，包含块就是由它的最近的 position 的值不是 static （也就是值为 fixed, absolute, relative 或 sticky）的祖先元素的内边距区的边缘组成。

3. 如果 position 属性是 fixed，在连续媒体的情况下 (continuous media) 包含块是 viewport ,在分页媒体 (paged media) 下的情况下包含块是分页区域 (page area)。

4. 如果 position 属性是 absolute 或 fixed，包含块也可能是由满足以下条件的最近父级元素的内边距区的边缘组成的：
   transform 或 perspective 的值不是 none
   will-change 的值是 transform 或 perspective
   filter 的值不是 none 或 will-change 的值是 filter（只在 Firefox 下生效）。
   contain 的值是 paint（例如：contain: paint;）
   backdrop-filter 的值不是 none（例如：backdrop-filter: blur(10px);）

# 根据包含块计算百分值

> 如上所述，如果某些属性被赋予一个百分值的话，它的计算值是由这个元素的包含块计算而来的。这些属性包括盒模型属性和偏移属性：

1. 要计算 height top 及 bottom 中的百分值，是通过包含块的 height 的值。如果包含块的 height 值会根据它的内容变化，而且包含块的 position 属性的值被赋予 relative 或 static ，那么，这些值的计算值为 auto。

2. 要计算 width, left, right, padding, margin 这些属性由包含块的 width 属性的值来计算它的百分值。
