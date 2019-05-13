let http=require('http');
let url=require('url');
let until=require('util');

//访问index.html
let fs=require('fs');

let httpserver=http.createServer((req,res)=>{	
	//indx。htnl的路径
	var pathname=url.parse(req.url).pathname
	//pathname=/index.html  去调/
	//readFile读取文件
	fs.readFile(pathname.substring(1),function(err,data){
		if(err){
			res.writeHead(404,{
				'Content-Type':'text/html'
			})
		}else{
			res.writeHead(200,{
				'Content-Type':'text/html'
			})
			res.write(data.toString())
		}
		res.end()
	})
	
	
})
httpserver.listen(3000,'127.0.0.1',()=>{
	console.log('服务起来的')
})