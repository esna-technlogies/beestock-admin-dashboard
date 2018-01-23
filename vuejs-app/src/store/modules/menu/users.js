import lazyLoading from './lazyLoading'

export default {
  name: 'Users',
  path: '/users',
  component: lazyLoading('users/Users'),
  meta: {
    title: 'menu.users',
    iconClass: 'fa fa-users'
  }
  // ,
  // children: [
  //   {
  //     name: 'UsersDataTable',
  //     path: '',
  //     component: lazyLoading('users/UsersDataTable'),
  //     meta: {
  //       title: 'Users Table'
  //     }
  //   },
  //   {
  //     name: 'UserDetails',
  //     path: ':uuid',
  //     component: lazyLoading('users/UserDetails'),
  //     props: true,
  //     meta: {
  //       title: 'User Details'
  //     }
  //   }
  // ]
}
