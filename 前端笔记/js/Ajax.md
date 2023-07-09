# 关于 ajax

> 全称 Asynchronous Javascript And XML，就是异步 js 和 xml，通过 ajax 在浏览器中发服务器发送异步请求，无刷新获取数据

- 缺点

1. 没有历史记录，不能回退
2. 存在跨域问题
3. SE0 不友

- 兼容问题

        let xhr = null;
        if (window.`XMLHttpRequest`) {// 兼容 IE7+, Firefox, Chrome, Opera, Safari
            xhr = new `XMLHttpRequest`();
        } else {// 兼容 IE6, IE5
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

- 使用

  xhr.open(methods,url,async)

          method：请求的类型；GET 或 POST
          url：文件在服务器上的位置
          async：true（异步）或 false（同步） 注意：POST请求一定要设置请求头的格式内容

  xhr.open("`POST`", "test.html", true);  
   xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
   xhr.send("fname=Henry&lname=Ford");

      const getJSON = function(url) {

  const promise = new Promise(function(resolve, reject){
  const handler = function() {
  if (this.readyState !== 4) {
  return;
  }
  if (this.status === 200) {
  resolve(this.response);
  } else {
  reject(new Error(this.statusText));
  }
  };
  const client = new XMLHttpRequest();
  client.open("GET", url);
  client.onreadystatechange = handler;
  client.responseType = "json";
  client.setRequestHeader("Accept", "application/json");
  client.send();
  });
  return promise;
  };

getJSON("/posts.json").then(function(json) {
console.log('Contents: ' + json);
}, function(error) {
console.error('出错了', error);
});

## readyStatus

> 是 XMLHttpRequest 对象的一个属性，用来表示 XMLHttpRequest 对象处于什么状态

    0：未初始化 — 尚未调用.open()方法；
    1：启动 — 已经调用.open()方法，但尚未调用.send()方法；
    2：发送 — 已经调用.send()方法，但尚未接收到响应；
    3：接收 — 已经接收到部分响应数据；
    4：完成 — 已经接收到全部响应数据，而且已经可以在客户端使用了；

# status

> HTTP 状态码(status)由三个十进制数字组成，第一个十进制数字定义了状态码的类型，后两个数字没有分类的作用。HTTP 状态码共分为 5 种类型：

        1xx（临时响应）：表示临时响应并需要请求者继续执行操作的状态码。
        2xx（成功）：表示成功处理了请求的状态码。
        3xx（重定向）：表示要完成请求，需要进一步操作。通常，这些状态代码用来重定向。
        4xx（请求错误）：这些状态码表示请求可能出错，妨碍了服务器的处理。
        5xx（服务器错误）：这些状态码表示服务器在尝试处理请求时发生内部错误。这些错误可能是服务器本身的错误，而不是请求出错。

> 常见的状态码
> 仅记录在 RFC2616 上的 HTTP 状态码就达 40 种，若再加上 WebDAV（RFC4918、5842）和附加 HTTP 状态码 （RFC6585）等扩展，数量就达 60 余种。接下来，我们就介绍一下这些具有代表性的一些状态码。

    200 表示从客户端发来的请求在服务器端被正常处理了。
    204 表示请求处理成功，但没有资源返回。
    301 表示永久性重定向。该状态码表示请求的资源已被分配了新的 URI，以后应使用资源现在所指的 URI。
    302 表示临时性重定向。
    304 表示客户端发送附带条件的请求时（指采用 GET 方法的请求报文中包含 if-matched,if-modified-since,if-none-match,if-range,if-unmodified-since 任一个首部）服务器端允许请求访问资源，但因发生请求未满足条件的情况后，直接返回 304Modified（服务器端资源未改变，可直接使用客户端未过期的缓存）
    400 表示请求报文中存在语法错误。当错误发生时，需修改请求的内容后再次发送请求。
    401 表示未授权（Unauthorized)，当前请求需要用户验证
    403 表示对请求资源的访问被服务器拒绝了
    404 表示服务器上无法找到请求的资源。除此之外，也可以在服务器端拒绝请求且不想说明理由时使用。
    500 表示服务器端在执行请求时发生了错误。也有可能是 Web 应用存在的 bug 或某些临时的故障。
    503 表示服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。

# GET 和 POST 请求数据区别

    1. GET在浏览器回退时是无害的，而POST会再次提交请求。
    2. GET产生的URL地址可以被Bookmark，而POST不可以。
    3. GET请求会被浏览器主动cache，而POST不会，除非手动设置。
    4. GET请求只能进行url编码，而POST支持多种编码方式。
    5.GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。
    6. GET请求在URL中传送的参数是有长度限制的，而POST么有。
    对参数的数据类型，GET只接受ASCII字符，而POST没有限制。
    7. GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。
    8. GET参数通过URL传递，POST放在Request body中。

### GET 和 POST 使用场景：

> 若符合下列任一情况，则推荐用 POST 方法：

    请求的结果有持续性的副作用，例如，数据库内添加新的数据行。
    若使用GET方法，则表单上收集的数据可能让URL过长。
    要传送的数据不是采用7位的ASCII编码。

    若符合下列任一情况，则推荐用GET方法：

    请求是为了查找资源，HTML表单数据仅用来帮助搜索。
    请求结果无持续性的副作用。
    收集的数据及HTML表单内的输入字段名称的总长不超过1024个字符。
