import Vue from 'vue/dist/vue.esm.browser'
import App from './App.vue'
import VueVirtualScroller from 'vue-virtual-scroller'

Vue.use(VueVirtualScroller)

Vue.config.productionTip = false

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

new Vue({
  render: h => h(App),
}).$mount('#app')
