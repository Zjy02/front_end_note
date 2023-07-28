# Array.from()

> Array.from() 静态方法从可迭代或类数组对象创建一个新的浅拷贝的数组实例。

    Array.from(arrayLike, mapFn, thisArg)

    arryLike: 想要转为数组的类数组或者可迭代对象

    mapFn: (可选)调用数组每个元素的函数，每个将要添加到数组中的值首先会传递给该函数，然后将 mapFn 的返回值增加到数组中。使用以下参数调用该函数，该方法接受两个参数 element index，不接受数组，因为数组仍然在构建中

    thisArg:执行mapFn的thi值

    示例

        // 根据 DOM 元素的属性创建一个数组
        const images = document.querySelectorAll("img");
        const sources = Array.from(images, (image) => image.src);
        const insecureSources = sources.filter((link) => link.startsWith("http://"));
