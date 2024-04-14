# 1. fetch

> fetch 使用 promise，不使用回调函数

    const response = fetch(url, {
    method: "GET",
    headers: {
        "Content-Type": "text/plain;charset=UTF-8"
    },

    // 可以是一个 Blob、ArrayBuffer、TypedArray、DataView、FormData、
    // URLSearchParams、字符串对象或者字符串字面量，或者 ReadableStream 对象
    // 注意 GET 或 HEAD 方法的请求不能包含消息主体。
    body: undefined,

    // 指定请求的引用者的字符串。这可以是同源 URL、about:client 或空字符串
    referrer: "about:client",

    // 指定请求所使用的 referrer policy。可能是以下其中之一 
    // no-referrer、no-referrer-when-downgrade、same-origin、origin、
    // strict-origin、origin-when-cross-origin、strict-origin-when-cross-origin 或者 unsafe-url
    referrerPolicy: "no-referrer-when-downgrade",

    // 指定请求的模式
    // cors：默认值，允许跨域请求。
    // same-origin：只允许同源请求。
    // no-cors：请求方法只限于 GET、POST 和 HEAD，
    // 并且只能使用有限的几个简单标头，不能添加跨域的复杂标头，相当于提交表单所能发出的请求。
    mode: "cors",

    // 控制浏览器如何处理凭据（cookie、HTTP authentication 条目和 TLS 客户端证书）
    // omit same-origin include
    credentials: "same-origin",

    // default、no-store、reload、no-cache、force-cache 和 only-if-cached
    cache: "default",

    //如何处理重定向（redirect）响应
    //follow 自动跟随重定向。除非另有说明，否则重定向模式设置为 follow。
    // error如果发生重定向，则中止并显示错误。
    // manual 调用者打算在另一个上下文中处理响应
    redirect: "follow",

    // 指定一个哈希值，用于检查 HTTP 回应传回的数据是否等于这个预先设定的哈希值
    integrity: "",

    // eepalive 选项可以允许请求持续保持连接，甚至页面已经关闭的情况。
    keepalive: false,
    
    // 一个 AbortSignal 对象实例；允许你通过 AbortController 与 fetch 请求进行通信，并在需要时中止请求
    signal: undefined
    
    // 指定相对于其他同类型的请求的 fetch 请求的优先级 
    // high 高 low 低  auto自动确认
    priority: high
    });

# 2. Response对象

> fetch请求成功后接收一个Response对象 它对应服务器的 HTTP 回应。

    const response = await fetch(url)
## 2.1 response同步属性

> Response 包含的数据通过 Stream 接口异步读取，但是它还包含一些同步属性，
> 对应 HTTP 回应的标头信息（Headers），可以立即读取

1. Response.ok

    > Response.ok属性返回一个布尔值，表示请求是否成功，true对应 HTTP 请求的状态码 200 到 299，false对应其他的状态码。

2. Response.status

    > Response.status属性返回一个数字，表示 HTTP 回应的状态码

3. Response.statusText

    > Response.statusText属性返回一个字符串，表示 HTTP 回应的状态信息

4. Response.url

    Response.url属性返回请求的 URL。如果 URL 存在跳转，该属性返回的是最终 URL。

5. Response.type

    > Response.type属性返回请求的类型。可能的值如下：
    1. basic：普通请求，即同源请求。
    2. cors：跨域请求
    3. error：网络错误，主要用于 Service Worker
    4. opaque：如果fetch()请求的type属性设为no-cors，就会返回这个值，详见请求部分。表示发出的是简单的跨域请求，类似<form>表单的那种跨域请求 
    5. opaqueredirect：如果fetch()请求的redirect属性设为manual，就会返回这个值，详见请求部分

## 2.2 判断是否请求成功
> fetch()发出请求以后，有一个很重要的注意点：只有网络错误，或者无法连接时，fetch()才会报错，其他情况都不会报错，而是认为请求成功。这就是说，即使服务器返回的状态码是 4xx 或 5xx，fetch()也不会报错（即 Promise 不会变为 rejected状态）。只有通过Response.status属性，得到 HTTP 回应的真实状态码，才能判断请求是否成功

    async function fetchText() {
        let response = await fetch('/readme.txt');
        if (response.status >= 200 && response.status < 300) {
            return await response.text();
        } else {
            throw new Error(response.statusText);
        }
    }

## 2.3 Response.headers 属性
> Response 对象还有一个Response.headers属性，指向一个 Headers 对象，对应 HTTP 回应的所有标头。Headers 对象可以使用for...of循环进行遍历。

  > Headers对象的方法

    1. get() 根据指定的键名，返回键值。
    2. has() 返回一个布尔值，表示是否包含某个标头
    3. set() 将指定的键名设置为新的键值，如果该键名不存在则会添加。
    4. append() 添加标头
    5. delete() 删除标头。
    6. keys()
    6. values()
    6. entries()
    6. forEach()

## 2.4 读取内容的方法
> Response对象根据服务器返回的不同类型的数据，提供了不同的读取方法。

1. text() 得到文本字符串
2. json() 得到 JSON 对象
3. blob() 得到二进制 Blob 对象
4. formData() 得到 FormData 表单对象
4. arrayBuffer() 得到二进制 ArrayBuffer 对象

## 2.5 Response.clone()
> stream 对象只能读取一次，读取完就没了，这意味着，前一节的五个读取方法，只能使用一个，否则会报错
> Response.clone()方法，创建Response对象的副本，实现多次读取

    const response1 = await fetch('flowers.jpg');
    const response2 = response1.clone();
    const myBlob1 = await response1.blob();
    const myBlob2 = await response2.blob();

    image1.src = URL.createObjectURL(myBlob1);
    image2.src = URL.createObjectURL(myBlob2);

## 2.6 Response.body()
> Response.body属性是 Response 对象暴露出的底层接口，返回一个 ReadableStream 对象，供用户操作
> 它可以用来分块读取内容，应用之一就是显示下载的进度

    const response = await fetch('flower.jpg');
    const reader = response.body.getReader();

    while(true) {
    const {done, value} = await reader.read();

    if (done) {
        break;
    }

    console.log(`Received ${value.length} bytes`)
    }

> response.body.getReader()方法返回一个遍历器。这个遍历器的read()方法每次返回一个对象，表示本次读取的内容块

> 这个对象的done属性是一个布尔值，用来判断有没有读完；value属性是一个 arrayBuffer 数组，表示内容块的内容，而value.length属性是当前块的大小

# 取消fetch请求

    let controller = new AbortController()
    let signal = controller.signal

    fetch(url, {
        signal
    })

    //监听取消fetch
    signal.addEventListener('abort',
        () => console.log('abort!')
    );

    controller.abort(); // 取消

    console.log(signal.aborted); // true

> https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html
