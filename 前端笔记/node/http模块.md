# http模块
用来创建web服务器的模块
    普通的电脑和服务器在于，服务器上安装了web服务器软件 例如 IIS Apache等
    一台电脑可以运行多个web服务，每个web服务对应唯一的端口号

    创建web服务器基本步骤:
    1.导入http模块
        const http = require('http')

    2. 创建web服务器实例
        const server = http.createServer()

    3.为服务器实例绑定request事件，监听客户端的请求
        server.on('request',(req,res)=>{
            //只要有客户端请求我们的自己的服务器，就会出发request事件，从而调用这个事件的处理函数
            console.log()

            //req 是请求对象，它包含了与客户端相关的数据和属性 例如
            //req.url 是客户端的请求的URL地址
            // req.method 是客户端的method 请求类型

            res.end()
            //向客户端响应内容，并结束这次请求的处理过程

            res.setHeader('Content-Type','text/html; charset=utf-8')
            //解决res响应内容的中文乱码的问题
        })

    4.启动服务器
    
    //调用服务器实例的listen方法，即可启动当前的web服务器实例
    //server.listen(端口号, 回调)
    server.listen(80, ()=>{
        console.log()
    })

## 根据不同的url地址相应不同的html内容
    实现步骤
        1.获取请求的url地址
        2.设置默认的相应内容为404 Not Found
        3.判断用户请求的是否为/ 或者/index.html首页