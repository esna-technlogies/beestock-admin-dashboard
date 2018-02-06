import lazyloading from './lazyLoading'

export default {
  name: 'Categories',
  path: '/categories',
  component: lazyloading('categories/Categories'),
  props: true,
  meta: {
    secured: true,
    title: 'menu.categories',
    iconClass: 'vuestic-icon vuestic-icon-tables'
  }
}
