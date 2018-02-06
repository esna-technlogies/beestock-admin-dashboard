import lazyLoading from './lazyLoading'

export default {
  name: 'menu.extra',
  path: '/extra',
  component: lazyLoading('extra/Extra'),
  meta: {
    default: false,
    secured: true,
    title: 'menu.extra',
    iconClass: 'vuestic-icon vuestic-icon-extras',
    expanded: false
  }
}
