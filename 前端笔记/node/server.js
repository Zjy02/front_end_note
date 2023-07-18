const fs = require('fs')
const path = require('path')
const http = require('http')

const server = http.createServer()

server.on('request',(req,res)=>{
    console.log('ready')
    const url = req.url
    const fspath = path.join(__dirname,url)

    fs.readFile(fspath,'utf-8',(err,dataStr)=>{
        if(err) return res.end('404')

        res.end(dataStr)
    })
})