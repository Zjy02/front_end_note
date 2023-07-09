#  fs模块
    创建实例 const fs = require('fs')

## 读取文件 fs.readFile()
    fs.readFile(path, [option] , callback)
    1. path 表示文件路径 字符串
    2. option 可选参数 以什么编码格式来读取文件
    3. callback 文件读取后,通过回调函数拿到读取结果

    例 
    const fs = require('fs')
    fs.readFile('./files/11.txt', 'utf8', function(err, dataStr){

        // 读取成功 err的值为null
        //如果读取失败，err的值错误对象
        console.log(err) 
        err.message 错误原因 

        // 读取成功，输出文件中的内容
        //如果读取失败,dataStr的值为undefined
        console.log(dataStr) 
    })

## 向文件写入内容 fs.writeFile()
    fs.writeFile(path, data, [option], callback )
    1. path 表示文件路径 字符串
    2. data 向文件中写入的内容
    3. option 表示以什么编码格式写入文件 默认为utf8
    4. callback 写入文成后的回调函数

    例
    const fs = require('fs')
    fs.writeFile('f:/file/2.txt', 'abcd', function(err){
        if(err){
            // 读取成功 err的值为null
            //如果读取失败，err的值错误对象
            console.log(err)

            return console.log('文件写入失败！' +err.message)
        }

        console.log("写入文件成功")
    })

    > 注意 fs.writeFile() 只能创建文件，不能创建路径
           重复调用fs.writeFile() 新内容会覆盖旧内容

## 处理路径问题
    __dirname 当前文件所在的目录

    fs.readFile(__dirname+'/file/1.txt', 'utf8', function(err,dataStr){
        if(err){
            return console.log("读取文件失败"+err.message)
        }
    ·   console.log('读取文件成功'+dataStr)
    })