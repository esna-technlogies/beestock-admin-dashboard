import lazyLoading from './lazyLoading'

export default {
  name: 'Maps',
  meta: {
    expanded: false,
    title: 'menu.maps',
    iconClass: 'vuestic-icon vuestic-icon-maps'
  },

  children: [
    {
      name: 'GoogleMaps',
      path: '/maps/google-maps',
      component: lazyLoading('maps/google-maps/GoogleMapsPage'),
      meta: {
        secured: true,
        title: 'Google Maps'
      }
    },
    {
      name: 'LeafletMaps',
      path: '/maps/leaflet-maps',
      component: lazyLoading('maps/leaflet-maps/LeafletMapsPage'),
      meta: {
        secured: true,
        title: 'Leaflet Maps'
      }
    },
    {
      name: 'BubbleMaps',
      path: '/maps/bubble-maps',
      component: lazyLoading('maps/bubble-maps/BubbleMapsPage'),
      meta: {
        secured: true,
        title: 'Bubble Maps'
      }
    },
    {
      name: 'LineMaps',
      path: '/maps/line-maps',
      component: lazyLoading('maps/line-maps/LineMapsPage'),
      meta: {
        secured: true,
        title: 'Line Maps'
      }
    }
  ]
}
