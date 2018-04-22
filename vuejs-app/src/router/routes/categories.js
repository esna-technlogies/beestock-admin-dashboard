import lazyLoading from '../../store/modules/menu/lazyLoading'

import {routeConditions} from '../../config'

const {AUTHENTICATED_USER} = routeConditions

export const newCategory = {
  name: 'NewCategory',
  path: '/categories/new',
  component: lazyLoading('categories/NewCategory'),
  props: true,
  meta: {
    conditions: [AUTHENTICATED_USER]
  }

}

export const categoryDetails = {
  name: 'CategoryDetails',
  path: '/category/:uuid',
  component: lazyLoading('categories/CategoryDetails'),
  props: true,
  meta: {
    conditions: [AUTHENTICATED_USER]
  }
}
