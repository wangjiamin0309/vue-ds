<template>
    <div>
    	<Header></Header>
    	<NavTable>
    		<span slot="bread">goods</span>
    	</NavTable>
    	<div class="accessory-result-page accessory-page">
	        <div class="container">
	          <div class="filter-nav">
	            <span class="sortby">Sort by:</span>
	            <a href="javascript:void(0)" class="default cur">Default</a>
	            <a @click="setSortGoods" href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
	            <a  href="javascript:void(0)" class="filterby stopPop" @click="showPrice">Filter by</a>
	          </div>
	          <div class="accessory-result">
	            <!-- filter -->
	            <div class="filter stopPop" id="filter" :class="{'filterby-show':showPrices}">
	              <dl class="filter-price">
	                <dt>Price:</dt>
	                <dd><a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}" @click="priceChecked='all'">All</a></dd>
	                <dd v-for="(item,index) in priceFilter">
	                  <a href="javascript:void(0)" @click="serPriceActive(index,item)" :class="{'cur':priceChecked==index}">{{item.startPrice}} - {{item.endPrice}}</a>
	                </dd>
	                
	              </dl>
	            </div>
	
	            <!-- search result accessories list -->
	            <div class="accessory-list-wrap">
	              <div class="accessory-list col-4">
	                <ul>
	                  <li v-for="item in GoodList" >
	                    <div class="pic">
	                      <a href="#"><img v-lazy="'/static/'+item.prodcutImg" alt=""></a>
	                    </div>
	                    <div class="main">
	                      <div class="name">{{item.productName}}</div>
	                      <div class="price">{{item.term}}</div>
	                      <div class="btn-area">
	                        <a @click="addCart(item.productId)" href="javascript:;" class="btn btn--m">加入购物车</a>
	                      </div>
	                    </div>
	                  </li>                 
	                </ul>	                
					<div 
					v-infinite-scroll="loadMore" 
					infinite-scroll-disabled="busy" 
					infinite-scroll-distance="10">
					 <img src="../../static/loading-svg/loading-spinning-bubbles.svg"  v-show="loading"/>
					</div>
	              </div>
	            </div>
	          </div>
	        </div>
	      </div>
	      <div class="md-overlay" v-show="wrapperPrice" @click="closePrice"></div>
	      <Modal :mdShows='mdShow' @closeMD="closeMD"> 
	      	<p slot="message">请登陆，否则无法加入购物车</p>
	      	<div slot="btnGroup">
	      		<a class="btn" @click="closeAddLists">关闭</a>
	      	</div>
	      </Modal>
    	<Footer></Footer>
    </div>
</template>

<script>
	import '.././assets/css/base.css'
	import '.././assets/css/product.css'
	import '.././assets/css/login.css'
	import '.././assets/css/checkout.css'
	import Header from '@/components/header.vue'
	import Footer from '@/components/footer.vue'
	import NavTable from '@/components/NavTable.vue'
	import Modal from '@/components/modal.vue'
	import axios from 'axios'
    export default{
    	components:{
    		Header,
    		Footer,
    		NavTable,
    		Modal
    	},
        data(){
            return {
				GoodList:[],
				priceFilter:[
					{
						startPrice:0,
						endPrice:90
					},
					{
						startPrice:180,
						endPrice:270
					},
					{
						startPrice:360,
						endPrice:null
					}
				],
				priceChecked:'all',
				showPrices:false,
				wrapperPrice:false,
				busy:true,
				sortflag:true,
				page:1,
				pageSize:8,
				loading:false,
				productSize:0,
				startDay:'all',
				endDay:'all',
				mdShow:false
            }
        },
        methods:{
        	getGoodList(flag,chaxun){      		
        		var param={      			
        			pageNum:this.page,
	        		pageSize:this.pageSize,
	        		startDay:this.startDay,
	        		endDay:this.endDay
        		}   
        		this.loading=true
        		axios.get('https://www.yiyijinfu.com/product/find-yzt.html?status=all',{
        			params:param
        		}).then((res)=>{
        			this.loading=false
        			//如果falg是true说明触发了分页,GoodList累加起来，否则是普通请求
        			if(flag){
        				if(res.data.data != ''){
        					this.GoodList=this.GoodList.concat(res.data.data)
        				}
        				this.productSize=res.data.total
        				console.log(this.GoodList)
        				if(this.productSize==''){
        					
        					this.busy=true
        				}else{
        					
        					this.busy=false
        				}       				       				       			       							
        			}else{
        				this.GoodList=res.data.data
        				this.busy=false
        			}
        			
					//console.log(this.GoodList)
				},(err)=>{
					console.log(err)
				})
        	},
        	//显示区间的价格
        	serPriceActive(index,item){
        		console.log(item)
        		this.priceChecked=index;
        		this.page=1;
        		      			
        			this.startDay=item.startPrice,
        			this.endDay=item.endPrice
        		
        		this.getGoodList();
        		this.closePrice();
        	},
        	
        	showPrice(){
        		console
        		this.showPrices=true;
        		this.wrapperPrice=true;
        	},
        	closePrice(){
        		this.showPrices=false;
        		this.wrapperPrice=false;
        	},
        	//价钱排序，后台接受1就是正序，-1就是倒叙
        	setSortGoods(){
//	        	this.sortflag=!this.sortflag;
//	        	this.page=1;
//	        	this.getGoodList();
        	},
        	//插件滚动分页
        	loadMore(){        		
        	 this.busy=true;
//      	 console.log(this.busy)
			  setTimeout(()=>{
			  
			  		this.page++;	
			  		
			  		console.log(this.busy)
//			  	    if(this.busy != true){
			  	    	this.getGoodList(true) 
//			  	    }
			  		 
			  	
			  
			  	    
			  	//alert('触发loadMore，请求下一页的信息');
			  },1000)
			 },
			 addCart(productId){
			 	var ID=productId
			 	axios.get('/static/mock/goods.json',{
			 		params:ID
			 	}).then((res)=>{
			 		 this.$store.commit('updateCartCount',1);
			 		 
			 		console.log('加入购物车')
			 		//判断状态值如果是登陆成功不显示，没有登陆显示放入err里
			 		//这里是调试 
			 		this.mdShow=true
			 	},(err)=>{
			 		console.log(err)
			 		
			 	})
			 },
			 closeMD(){
			 	this.mdShow=false
			 },
			 closeAddLists(){
			 	this.mdShow=false
			 }
        },
        mounted(){
        	this.getGoodList()        	
        }
    }
</script>
<style>
.md-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 9;
}
</style>
