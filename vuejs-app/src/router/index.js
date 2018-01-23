import Vue from 'vue'
import Router from 'vue-router'

import menuModule from 'vuex-store/modules/menu'

// import User from '../components/users/User'
// import UserDetails from '../components/user-details/UserDetails'
import lazyLoading from '../store/modules/menu/lazyLoading'

Vue.use(Router)

export default new Router({
  routes: [
    ...generateRoutesFromMenu(menuModule.state.items),
    // {
    //   name: 'UsersDataTable',
    //   path: '/users',
    //   component: lazyLoading('users/UsersDataTable'),
    //   meta: {
    //     title: 'Users Table'
    //   }
    // },
    {
      name: 'UserDetails',
      path: '/user-details/:uuid',
      component: lazyLoading('user-details/UserDetails'),
      props: true,
      meta: {
        title: 'User Details'
      }
    },
    // {
    //   path: '/user/:uuid',
    //   component: User,
    //   children: [
    //     {
    //       path: '',
    //       name: 'userDetails',
    //       component: UserDetails,
    //       props: true,
    //       meta: {
    //         title: 'User Details'
    //       }
    //     }
    //   ]
    // },
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
