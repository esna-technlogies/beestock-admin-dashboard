import lazyLoading from '../../store/modules/menu/lazyLoading'

import {routeConditions} from '../../config'

const {AUTHENTICATED_USER} = routeConditions

export const photoDetails = {
  name: 'PhotoDetails',
  path: '/photos/:uuid',
  component: lazyLoading('photos/PhotoDetails'),
  props: true,
  meta: {
    conditions: [AUTHENTICATED_USER]
  }
}
