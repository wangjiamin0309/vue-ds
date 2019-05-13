let hppt = require('http');
let util=require('util')
hppt.get('http://www/imooc.com/u/card',function(res){
	let data='';
	res.on('data',function(chunk){
		data+=chunk
	});
	res.on('end',function(){
		let result=JSON.parse(data)
		console.log(util.inspect(result))
	})
})
