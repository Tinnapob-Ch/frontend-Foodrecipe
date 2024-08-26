import Vue from 'vue'

import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'

import { required, numeric, email } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'กรุณาระบุ'

})

extend('numeric', {
  ...numeric,
  message: 'กรุณาระบุตัวเลขเท่านั้น'
})

extend('email', {
  ...email,
  message: 'กรุณาระบุอีเมล์ให้ถูกต้อง'
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
