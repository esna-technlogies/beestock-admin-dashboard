import lazyloading from './lazyLoading'

export default {
  name: 'Photos',
  path: '/photos',
  component: lazyloading('photos/Photos'),
  props: true,
  meta: {
    secured: true,
    title: 'menu.photos',
    iconClass: 'fa fa-photo'
  }
}
