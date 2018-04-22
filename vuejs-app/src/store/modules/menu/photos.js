import lazyloading from './lazyLoading'

import {routeConditions} from '../../../config'

const {AUTHENTICATED_USER} = routeConditions

export default {
  name: 'Photos',
  path: '/photos',
  component: lazyloading('photos/Photos'),
  props: true,
  meta: {
    conditions: [AUTHENTICATED_USER],
    title: 'menu.photos',
    iconClass: 'fa fa-photo'
  }
}
