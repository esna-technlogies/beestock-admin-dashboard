import lazyLoading from './lazyLoading'

export default {
  name: 'Users',
  path: '/users',
  component: lazyLoading('users/Users'),
  props: true,
  meta: {
    secured: true,
    title: 'menu.users',
    iconClass: 'fa fa-users'
  }
}
