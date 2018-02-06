import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'


import menuModule from 'vuex-store/modules/menu'

import lazyLoading from '../store/modules/menu/lazyLoading'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  routes: [
    ...generateRoutesFromMenu(menuModule.state.items),
    {
      name: 'Login',
      path: '/auth/login',
      component: lazyLoading('auth/login/Login'),
      meta: {
        secured: false
      }
    },
    {
      name: 'UserDetails',
      path: '/users/:uuid',
      component: lazyLoading('users/UserDetails'),
      props: true,
      meta: {
        secured: true
      }
    },
    {
      name: 'NewCategory',
      path: '/categories/new',
      component: lazyLoading('categories/NewCategory'),
      props: true,
      meta: {
        secured: true
      }

    },
    {
      name: 'CategoryDetails',
      path: '/category/:uuid',
      component: lazyLoading('categories/CategoryDetails'),
      props: true,
      meta: {
        secured: true
      }
    },
    {
      name: 'PhotoDetails',
      path: '/photos/:uuid',
      component: lazyLoading('photos/PhotoDetails'),
      props: true,
      meta: {
        secured: true
      }
    },
    {path: '*', redirect: { name: getDefaultRoute(menuModule.state.items).name }}
  ]
})

function generateRoutesFromMenu (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      routes.push(item)
    }
    if (item.children) {
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}

function getDefaultRoute (menu = []) {
  let defaultRoute

  menu.forEach((item) => {
    if (item.meta.default) {
      defaultRoute = item
    } else if (item.children) {
      let defaultChild = item.children.find((i) => i.meta.default)
      defaultRoute = defaultChild || defaultRoute
    }
  })

  return defaultRoute
}
