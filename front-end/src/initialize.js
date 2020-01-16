import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

for (let rule in rules) {
  extend(rule, rules[rule])
}

Vue.config.productionTip = false
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
