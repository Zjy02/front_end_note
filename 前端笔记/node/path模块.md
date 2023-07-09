# path模块
    用来处理路径的模块
    const path = require('path')
## path方法

    1.path.join()
        将多个路径片段拼成一个完整的路径字符串
        例
        const path1 = path.join('/a', '/b/c', '../', './d', 'e')

        // \a\b\d\e
        // './' 拼接时会自己删除
        // 一个 '../' 会删除前一个路径
        // 两个 '../' 会删除前面两个路径以此类推

        const path1 = path.join('../f','/a', '/b/c', '../', './d', 'e');
    //..\f\a\b\d\e

    2.path.basename() 
        用来从路径字符串中，将文件的名字解析出来

        console.log(path.basename('a/b/c/d/index.html'))
        //index.html

        console.log(path.basename('a/b/c/d/index.html','.html'))
        //index

    3.path.extname() 
        获取路径中的扩展名部分

        console.log(path.extname('a/c/cv/vsda/index.html'))
        //.html

