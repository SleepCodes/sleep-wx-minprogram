import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import api from './api'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
