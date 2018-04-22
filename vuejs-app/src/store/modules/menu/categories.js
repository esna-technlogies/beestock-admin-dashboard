import lazyloading from './lazyLoading'

import {routeConditions} from '../../../config'

const {AUTHENTICATED_USER} = routeConditions

export default {
  name: 'Categories',
  path: '/categories',
  component: lazyloading('categories/Categories'),
  props: true,
  meta: {
    conditions: [AUTHENTICATED_USER],
    title: 'menu.categories',
    iconClass: 'vuestic-icon vuestic-icon-tables'
  }
}
