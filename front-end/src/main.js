import Vue from 'vue'
import App from './App.vue'
import '@/initialize'
import 'bootstrap/dist/css/bootstrap.min.css'

new Vue({
  render: h => h(App)
}).$mount('#app')
