import lazyLoading from '../../store/modules/menu/lazyLoading'

import {routeConditions} from '../../config'

const {AUTHENTICATED_USER} = routeConditions

export const userDetails = {
  name: 'UserDetails',
  path: '/users/:uuid',
  component: lazyLoading('users/UserDetails'),
  props: true,
  meta: {
    conditions: [AUTHENTICATED_USER]
  }
}
