import lazyLoading from './lazyLoading'

import {routeConditions} from '../../../config'

const {AUTHENTICATED_USER} = routeConditions

export default {
  name: 'Users',
  path: '/users',
  component: lazyLoading('users/Users'),
  props: true,
  meta: {
    conditions: [AUTHENTICATED_USER],
    title: 'menu.users',
    iconClass: 'fa fa-users'
  }
}
