const Vue = require('vue')
const ElementUI = require('element-ui')
const axios = require('axios')

import App from './App'
import router from './router'
import store from './store'
import ccommon from './utils'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ccommon)
Vue.use(Vuelidate)

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
