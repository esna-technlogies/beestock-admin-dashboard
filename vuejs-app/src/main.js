// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import VeeValidate from 'vee-validate'
import VuesticPlugin from 'src/components/vuestic-components/vuestic-components-plugin'
// import BootstrapVue from 'bootstrap-vue'
// import ToggleButton from 'vue-js-toggle-button'
// import Moment from 'vue-moment'
import './i18n'


// import {authService} from './services'
import beforeEachRoute from './router/before-each-route'

Vue.use(VuesticPlugin)
// Vue.use(BootstrapVue)
// Vue.use(ToggleButton)
Vue.use(require('vue-moment'))

// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, {fieldsBagName: 'formFields'})

sync(store, router)

let mediaHandler = () => {
  if (window.matchMedia(store.getters.config.windowMatchSizeLg).matches) {
    store.dispatch('toggleSidebar', true)
  } else {
    store.dispatch('toggleSidebar', false)
  }
}

router.beforeEach((to, from, next) => {
  store.commit('setLoading', true)

  if (store.getters.currentUserJwtToken()) store.commit('setAuthenticated', true)

  // const requiresAuth = to.matched.some(({ meta }) => {
  //   return meta.secured
  // })
  //
  // if (requiresAuth) {
  //   if (authService.isAuthenticated() && !authService.isJwtTokenExpired()) {
  //     return next()
  //   }
  //
  //   const query = { path: to.fullPath }
  //   return next({ name: 'Login', query })
  // }
  //
  // next()

  return beforeEachRoute(to, from, next)
})

router.afterEach((to, from) => {
  mediaHandler()
  store.commit('setLoading', false)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
