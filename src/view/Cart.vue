<template>
  <div>
  	<Header></Header>
  	<NavTable>
  		<span slot="bread">购物车</span>
  	</NavTable>
   <div class="container">
      <div class="cart">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>My Cart</span></h2>
        </div>
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
                <li>Items</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
                <li>Edit</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="item in CartList">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <a href="javascipt:;" class="checkbox-btn item-check-btn" :class="{'check':item.checkedProduct==1}" @click="changeNumber('checked',item)" >
                      <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"></use>
                      </svg>
                    </a>
                  </div>
                  <div class="cart-item-pic">
                    <img :src="'/static/'+item.prodcutImg" :alt="item.productName">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.productName}}</div>
                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.prodcutPrice}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self select-self-open">
                      <div class="select-self-area">
                        <a class="input-sub" @click="changeNumber('sub',item)">-</a>
                        <span class="select-ipt">{{item.prodcutnumber}}</span>
                        <a class="input-add" @click="changeNumber('add',item)">+</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{item.prodcutPrice*item.prodcutnumber | currencys('$')}}</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <a href="javascript:;" class="item-edit-btn" @click="deleteConfirm(item.productId)">
                      X
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart-foot-wrap">
          <div class="cart-foot-inner">
            <div class="cart-foot-l">
              <div class="item-all-check" @click="checkedAll">
                <a href="javascipt:;">
                  <span class="checkbox-btn item-check-btn" :class="{'check':checkedAllFalg}">
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                  </span>
                  <span>Select all</span>
                </a>
              </div>
            </div>
            <div class="cart-foot-r">
              <div class="item-total">
                Item total: <span class="total-price">{{totalPrice | currencys('$')}}</span>
              </div>
              <div class="btn-wrap">
                <a class="btn btn--red" :class="{'btn--dis':checkedAllCount==0}" @click="Checkout">Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal :mdShows="showDeleteMd" @closeMD="hideMD">
    	<p slot="message">确定删除？</p>
    	<div slot="btnGroup">
    		<a class="btn" @click="deleteCart">确认</a>
    		<a class="btn" @click="showDeleteMd=false">关闭</a>
    	</div>
    </Modal>
		<Footer></Footer>
  </div>
</template>
<style>
  .input-sub,.input-add{
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }
  .item-quantity .select-self-area{
    background:none;
    border: 1px solid #f0f0f0;
  }
  .item-quantity .select-self-area .select-ipt{
    display: inline-block;
    padding:0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }
</style>
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
	//import {currency} from './../util/currency.js'
export default{
	components:{
		Header,
		Footer,
		NavTable,
		Modal
	},
	data(){
	    return{
				CartList:[],
				showDeleteMd:false,
				productID:0
			
	    }
	},
	//布局过滤器
//	filters:{
//		currencys:currency
//	},
	mounted(){
		this.init()
	},
	computed:{
		checkedAllFalg(){
			if(this.checkedAllCount==this.CartList.length){
				return  true
			}				
		},
		checkedAllCount(){
			var i=0;
			this.CartList.forEach((item)=>{
				if(item.checkedProduct=='1'){
					i++
				}			
			})
			return i;
		},
		totalPrice(){
			var money=0;
			this.CartList.forEach((item)=>{
				if(item.checkedProduct=='1'){
					
					money+=parseFloat(item.prodcutPrice)*parseInt(item.prodcutnumber)
				}
			})
			return money
		}
	},
	methods:{
		init(){
			axios.get('/static/mock/goods.json').then((res)=>{
				this.CartList=res.data.result
				console.log(res)
			},(err)=>{
				console.log(err)
			})
		},
		hideMD(){
			this.showDeleteMd=false
		},
		deleteConfirm(productId){
			this.productID=	productId
			
			this.showDeleteMd=true
		},
		deleteCart(){
			//console.log(this.productID)
			axios.get('/static/mock/goods.json',{
				productId:this.productID
			}).then((res)=>{
				var jian=this.productID.num
				this.$store.commit('updateCartCount',jian);
				if(res.result=='0'){
					this.showDeleteMd=false
					this.init()
				}
			},(err)=>{
				console.log(err)
			})
			
		},
		changeNumber(falg,item){
			console.log(11)
			if(falg=='add'){
				item.prodcutnumber++;
			}else if(falg=='sub'){
				if(item.prodcutnumber<=1){
					return
				}
				item.prodcutnumber--;
			}else{
				item.checkedProduct=item.checkedProduct=='1'?'0':'1'
			}
			axios.get('/static/mock/goods.json',{
					productId:item.productID,
					prodcutnumber:item.prodcutnumber,
					checkedProduct:item.checkedProduct
			}).then((res)=>{
				let mun=0;
				if(falg=='add'){
					mun=1
				}else if(falg=='sub'){
						mun=-1
				}
				this.$store.commit('updateCartCount',mun);
				//console.log(res)
				//	console.log(res)
			},(err)=>{
				console.log(err)
			})
		},
		checkedAll(){
			//计算属性无法改值，需要重新赋值才可以改变
			var falg=!this.checkedAllFalg	
			this.CartList.forEach((item)=>{
				item.checkedProduct=	falg?'1':'0'
			})
				axios.get('/static/mock/goods.json',{
				checkedAllFalg:falg?'1':'0'
			}).then((res)=>{
					console.log(res)
			},(err)=>{
				console.log(err)
			})			
		},
		Checkout(){
			if(this.checkedAllCount>0){
				this.$router.push('/Address')
			}
		}
	}
}
</script>
