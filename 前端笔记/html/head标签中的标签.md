## html

> lang = 'en' 对浏览器友好的一种方式，提示浏览器页面的内容主要是用英语还是汉字显示而已
> en 为英文，汉字简体 zh-CH 台湾 zh-TW 香港 zh-HK

    <!DOCTYPE html>
    <html lang="en">
    <head>

    </head>
    <body>
    网页内容
    </body>
    </html>

## head 下的标签

> <\head>元素包含了所有的头部标签元素。在<\head>元素中你可以插入脚本（scripts）, 样式文件（CSS），及各种meta信息。
> 可以添加在头部区域的元素标签为: <\title>, <\style>, <\meta>, <\link>, <\script>, <\noscript> 和 <\base>。

### title

> 定义浏览器工具栏的标题
> 当网页添加到收藏夹时，显示在收藏夹中的标题
> 显示在搜索引擎的结果页面的效果

## meta
> meta标签描述了一些基本的元数据，其提供的元数据，不显示在页面上，但会被浏览器解析。其通常用来网页的描述，关键词，文件的最后修改时间，作者，和其他元数据,可以使用于浏览器（如何显示内容或重新加载页面），搜索引擎（关键词），或其他Web服务。

> 属性
1. name

2. http-equiv 相当于http的文件头作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确地显示网页内容，与之对应 的属性值为content，content中的内容其实就是各个参数的变量值

3. charset 告诉浏览器这个页面是什么编码格式，比如UTF-8等

> name 的参数

1. keywords 告诉搜索引擎你网页的关键字是什么， <\meta name="keywords" content="关键字内容">
2. description 告诉搜索引擎你的网站主要内容   <\meta name="description" content="主要内容">
3. robots 告诉搜索机器人哪些页面需要索引，哪些页面不需要索引 <\meta name="robots" content="none">
4. author 标注网页的作者                     <\meta name="author"content="作者名">

> http-equiv 下的参数

1. Expires(期限) 可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输。 

      <\meta http-equiv="expires" content="Fri,12Jan200118:18:18GMT">

2. Pragma(cache模式) 禁止浏览器从本地计算机的缓存中访问页面内容

      <\meta http-equiv="Pragma" content="no-cache">:这样设定，访问者将无法脱机浏览
    
3. Refresh(刷新)  <\meta http-equiv="Refresh" content="2;URL=http://www.baidu.com">
          (注意后面的分号，分别在网址的前面和秒数的后面):其中的2是指停留2秒钟后自动刷新到URL网址。

3. Set-Cookie(cookie设定) 如果网页过期，那么存盘的cookie将被删除

    <\meta http-equiv="Set-Cookie" content="cookievalue=xxx;expires=Friday,12-Jan-200118:18:18GMT；path=/">:必须使用GMT的时间格式。

3. content-Type(显示字符集的设定) 设定页面使用的字符集

    <\meta http-equiv="content-Type" content="text/html;charset=gb2312">

4. content-Language 显示语言的设定  <\meta http-equiv="Content-Language"content="zh-cn"/>

5. Window-target(显示窗口的设定)  强制页面在当前窗口以独立页面显示。

    <\meta http-equiv="Window-target" content="_top">:用来防止别人在框架里调用自己的页面。

6. Cache-Control 指定请求和响应遵循的缓存机制
    
    Cache-Control指定请求和响应遵循的缓存机制。在请求消息或响应消息中设置Cache-Control并不会修改另一个消息处理过程中的缓存处理过程。请求时的缓存指令包括no-cache、no-store、max-age、max-stale、min-fresh、only-if-cached，响应消息中的指令包括public、private、no-cache、no-store、no-transform、must-revalidate、proxy-revalidate、max-age。各个消息中的指令含义如下 Public指示响应可被任何缓存区缓存Private指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效;no-cache指示请求或响应消息不能缓存 ;no-store用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存。,max-age指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应;min-fresh指示客户机可以接收响应时间小于当前时间加上指定时间的响应;max-stale指示客户机可以接收超出超时期间的响应消息。如果指定max-stale消息的值，那么客户机可以接收超出超时期指定值之内的响应消息。

> charset

    <!DOCTYPE html>
    <html lang="zh">
    <head>
    <meta charset="utf-8">
    <title>我的文档标题</title>
    </head>

    <body>
    文档内容......
    </body>

    </html>

## base 

> 标签描述了基本的链接地址/链接目标，该标签作为HTML文档中所有的链接标签的默认链接

    <!DOCTYPE html>
    <html lang="zh">
    <head>
    <meta charset="utf-8">
    <base href="https://blog.csdn.net/u011863822/article/details/121775164" target="_blank">
    <title>我的文档标题</title>
    </head>

    <body>
    <!--暂时不用理解a标签，先看效果.后面会讲解这个标签-->
        <!--a标签就是超链接标签-->

        <a href="https://www.baidu.com/">百度</a>
        <br />
        <a href="">base的默认的链家</a>
    </body>

    </html>

## link

> 标签定义了文档与外部资源之间的关系。这个标签通常用于链接到样式表

    <head>
    <link rel="stylesheet" type="text/css" href="CSS格式.css">
    </head>

## style
> 标签定义了HTML文档的样式文件引用地址.在<style> 元素中你也可以直接添加样式来渲染 HTML 文档,这个有点<script>标签的格式的感觉

## script
> 这个是HTML中写JavaScript逻辑以及导入js文件的标签。
> 因为HTML的语言一般是由上而下执行的，如果将脚本会调用body中的元素时候，就会报错