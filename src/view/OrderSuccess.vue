<template>
    <div>
 	  <Header></Header>
      <div class="container">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>Confirm</span> address</li>
            <li class="cur"><span>View your</span> order</li>
            <li class="cur"><span>Make</span> payment</li>
            <li class="cur"><span>Order</span> confirmation</li>
          </ul>
        </div>

        <div class="order-create">
          <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
          <div class="order-create-main">
            <h3>Congratulations! <br>Your order is under processing!</h3>
            <p>
              <span>Order ID：62000000000</span>
              <span>Order total：{{total | currencys('$')}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                
                <router-link to="Cart" class="btn btn--m" >Cart List</router-link>
              </div>
              <div class="btn-r-wrap">
                <router-link to="OrderConfirm" class="btn btn--m" >Cart List</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            return{
				total:''
            }
        },
        
        mounted(){
        	this.total= this.$route.query.total;
        	//console.log(addressId)
        	
        }
    }
</script>
