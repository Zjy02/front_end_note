# 优先级

> 浏览器通过优先级来判断哪些属性值与一个元素最为相关，从而在该元素上应用这些属性值。优先级是基于不同种类选择器组成的匹配规则。

> 优先级就是分配给指定的 CSS 声明的一个权重，它由 匹配的选择器中的 每一种选择器类型的 数值 决定

> 当优先级与多个 CSS 声明中任意一个声明的优先级相等的时候，CSS 中最后的那个声明将会被应用到元素上

> 当同一个元素有多个声明的时候，优先级才会有意义。因为每一个直接作用于元素的 CSS 规则总是会接管/覆盖（take over）该元素从祖先元素继承而来的规则

# 选择器类型

> 递增

1. 类型选择器(如 h1) 和 伪元素(如 ::before)
2. 类选择器 (如 .example)，属性选择器 (如 [type = 'radio']) 和 伪类 (如 :hover)
3. ID 选择器

> 通配选择符（universal selector）（\*）关系选择符（combinators）（+, >, ~, " ", ||）和 否定伪类（negation pseudo-class）（:not()）对优先级没有影响。（但是，在 :not() 内部声明的选择器会影响优先级）。

# !import

> 当在一个样式声明中使用一个 !important 规则时，此声明将覆盖任何其他声明

> !important 与优先级无关，但它与最终的结果直接相关
