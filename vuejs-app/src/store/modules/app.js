import * as types from '../mutation-types'

const state = {
  sidebar: {
    opened: false,
    withoutAnimation: false
  },
  config: {
    googleMaps: {
      apiKey: 'AIzaSyBNAqPrTQoz9P4NBlDDyfxrnKiafkaL8iQ'
    },
    windowMatchSizeLg: '(min-width: 992px)',
    palette: {
      primary: '#4ae387',
      danger: '#e34a4a',
      info: '#4ab2e3',
      success: '#db76df',
      warning: '#f7cc36',
      white: '#fff',
      black: '#000',
      fontColor: '#34495e',
      transparent: 'transparent',
      lighterGray: '#ddd'
    }
  },
  isLoading: true,
  cookies: {
    jwtTokenName: 'jwt-token'
  },
  api: {
    beeStock: {
      baseURL: 'http://api.beesstock.com/',
      userSecurity: {
        login: '/api/user-service/security/login',
        logout: '/api/user-service/security/logout/user/{uuid}'
      },
      userAccount: {
        findAll: '/api/user-service/user',
        create: '/api/user-service/user',
        delete: '/api/user-service/user/{uuid}',
        findByUUID: '/api/user-service/user/{uuid}',
        partialUpdate: '/api/user-service/user/{uuid}',
        replace: '/api/user-service/user/{uuid}',
        suspendByUUID: '/api/user-service/user/{uuid}/suspend'
      },
      photo: {
        findAll: '/api/photo-service/photo',
        create: '/api/photo-service/photo',
        findByUUID: '/api/photo-service/photo/{uuid}',
        findByUserUUID: '/api/photo-service/photo/filter-by/user/{uuid}',
        findKeywordsList: '/api/photo-service/photo/keywords',
        findByCategoryUUID: '/api/photo-service/photo/filter-by/category/{uuid}'
      }
    }
  },
  roles: {
    active: 'ROLE_ACTIVE_USER',
    inactive: 'ROLE_INACTIVE',
    admin: 'ROLE_ACTIVE_USER'
  }
}

const mutations = {
  [types.CLOSE_MENU] (state) {
    if (document.documentElement.clientWidth < 992) {
      state.sidebar.opened = false
    }
  },
  [types.TOGGLE_SIDEBAR] (state, opened) {
    state.sidebar.opened = opened
  },
  [types.TOGGLE_WITHOUT_ANIMATION] (state, value) {
    state.sidebar.withoutAnimation = value
  },
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  }
}

const actions = {
  closeMenu ({ commit }) {
    commit(types.CLOSE_MENU)
  },
  toggleSidebar ({ commit }, opened) {
    commit(types.TOGGLE_SIDEBAR, opened)
  },
  isToggleWithoutAnimation ({ commit }, value) {
    commit(types.TOGGLE_WITHOUT_ANIMATION, value)
  }
}

export default {
  state,
  mutations,
  actions
}
