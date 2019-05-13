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
	                  <a href="javascript:void(0)" @click="serPriceActive(index)" :class="{'cur':priceChecked==index}">{{item.startPrice}} - {{item.endPrice}}</a>
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
	                      <div class="price">{{item.prodcutPrice}}</div>
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
	import axios from 'axios'
    export default{
    	components:{
    		Header,
    		Footer,
    		NavTable
    	},
        data(){
            return {
				GoodList:[],
				priceFilter:[
					{
						startPrice:'0.00',
						endPrice:'500.00'
					},
					{
						startPrice:'500.00',
						endPrice:'1000.00'
					},
					{
						startPrice:'1000.00',
						endPrice:'1500.00'
					}
				],
				priceChecked:'all',
				showPrices:false,
				wrapperPrice:false,
				busy:true,
				sortflag:true,
				page:1,
				pageSize:8,
				loading:false
				
            }
        },
        methods:{
        	getGoodList(flag){
        		var param={
        			page:this.page,
        			pageSize:this.pageSize,
        			sort:this.sortflag?1:-1,
        			priceChecked:this.priceChecked
        		}
        		this.loading=true
        		axios.get('/static/mock/goods.json',{
        			params:param
        		}).then((res)=>{
        			//如果falg是true说明触发了分页,GoodList累加起来，否则是普通请求
        			this.loading=false
        			if(flag){
        				this.GoodList=this.GoodList.concat(res.data.result)
        				//如果总条数是0，滚动请求禁用this.busy=true
        					if(res.data.result.count==0){
        						this.busy=true
	        				}else{
	        					this.busy=false
	        				}
        			}else{
        				this.GoodList=res.data.result
        				this.busy=false
        			}       			
					console.log(this.GoodList)
				},(err)=>{
					console.log(err)
				})
        	},
        	//显示区间的价格
        	serPriceActive(index){
        		this.priceChecked=index;
        		this.page=1;
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
	        	this.sortflag=!this.sortflag;
	        	this.page=1;
	        	this.getGoodList();
        	},
        	//插件滚动分页
        	loadMore(){        		
        	 this.busy=true;
			  setTimeout(()=>{
			  	this.page++;	
			  	this.getGoodList(true)      
			  //	alert('触发loadMore，请求下一页的信息');
			  },1000)
			 },
			 addCart(productId){
			 	var ID=productId
			 	axios.get('/static/mock/goods.json',{
			 		params:ID
			 	}).then((res)=>{
			 		console.log(res)
			 	},(err)=>{
			 		console.log(err)
			 	})
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