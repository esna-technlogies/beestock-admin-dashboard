import lazyLoading from './lazyLoading'

export default {
  name: 'Users',
  path: '/users',
  component: lazyLoading('users/Users'),
  meta: {
    title: 'menu.users',
    iconClass: 'vuestic-icon vuestic-icon-user'
  }
}
