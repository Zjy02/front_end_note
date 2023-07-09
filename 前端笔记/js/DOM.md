## 元素消失的方法
1. display
2. visibility
3. opacity(0)
4. transform:scale(0)
5. removeChild() (js)
6. clip
7. z-index
8. position
9. overflow

## DOM元素（节点）

1. 创建元素并添加 appendChild()
    var para = document.createElement("p");
    var node = document.createTextNode("这是一个新的段落");
    para.appendChild(node);
    var element = document.getElementById("div1");
    element.appendChild(para);

2. insetbefore将创建的元素插入开始位置

3. 移除已存在的元素 removeChild()

##