import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/view/GoodsLists.vue'
import Cart from '@/view/Cart.vue'
import Address from '@/view/Address.vue'
import OrderConfirm from '@/view/OrderConfirm.vue'  // 订单确认页面
import OrderSuccess from '@/view/OrderSuccess.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    },
     {
      path: '/Address',
      name: 'Address',
      component: Address
    },
    {
      path: '/OrderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
     {
      path: '/OrderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    }
  ]
})
