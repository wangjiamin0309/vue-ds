// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
	loading:"/static/loading-svg/loading-bars.svg"
})

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)


//定义全局过滤器
import {currency} from './util/currency.js'
Vue.filter('currencys',currency)

Vue.config.productionTip = false
//vuex
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    nickName:'',  // 用户名
    cartCount:0  // 购物车数量
  },
  mutations: {  // 更改状态
    //更新用户信息
    updateUserInfo(state, nickName) {
        state.nickName = nickName;
    },
    updateCartCount(state,cartCount){
        state.cartCount += cartCount;
    },
    initCartCount(state,cartCount){
        state.cartCount = cartCount;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
