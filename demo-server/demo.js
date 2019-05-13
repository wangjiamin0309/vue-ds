let suer=require('./uer.js')
console.log(`username:${suer.uname}`)
console.log(`see:${suer.hello()}`)
let http=require('http');
let url=require('url');
let until=require('util')
let httpserver=http.createServer((req,res)=>{
	res.statusCode=200;
	res.setHeader("Content-Type","text/plain;charset=utf-8");
	//获取路径
	var a=url.parse(req.rul)
	//util方法转换程对象
	var b=until.inspect(a)
	res.end(b)
})
httpserver.listen(3000,'127.0.0.1',()=>{
	console.log('服务起来的')
})
