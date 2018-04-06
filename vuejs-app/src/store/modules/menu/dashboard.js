import lazyLoading from './lazyLoading'

import {routeConditions} from '../../../config'

const {AUTHENTICATED_USER} = routeConditions

export default {
  name: 'Dashboard',
  path: '/dashboard',
  component: lazyLoading('dashboard/Dashboard'),
  meta: {
    default: true,
    conditions: [AUTHENTICATED_USER],
    title: 'menu.dashboard',
    iconClass: 'vuestic-icon vuestic-icon-dashboard'
  }
}
