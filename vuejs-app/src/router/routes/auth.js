import lazyLoading from '../../store/modules/menu/lazyLoading'

import {routeConditions} from '../../config'

const {NO_LOGIN} = routeConditions

export const login = {
  name: 'Login',
  path: '/auth/login',
  component: lazyLoading('auth/login/Login'),
  meta: {
    conditions: [NO_LOGIN]
  }
}
