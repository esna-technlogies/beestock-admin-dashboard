import * as types from '../mutation-types'

import api from '../../api/beestock'
import utils from '../../services/utils'
import {userService, authService} from '../../services'

import JwtDecode from 'jwt-decode'

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
      },
      category: {
        findAll: '/api/photo-service/category',
        create: '/api/photo-service/category',
        delete: '/api/photo-service/category/{uuid}',
        findByUUID: '/api/photo-service/category/{uuid}',
        findRandomPhotoByUUID: '/api/photo-service/category/random/category/{uuid}'
      }
    }
  },
  roles: {
    active: 'ROLE_ACTIVE_USER',
    inactive: 'ROLE_INACTIVE',
    admin: 'ROLE_ACTIVE_USER'
  },
  isPageLoading: true,
  isAuthenticatedUser: false
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
  },
  setAuthenticated (state, isAuthenticated) {
    state.isAuthenticatedUser = isAuthenticated
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
  },
  async doLogin ({ commit, dispatch }, credentials) {
    await authService.login(credentials)
      .then(response => {
        const inactiveUser = JwtDecode(response.data.token).roles.some(role => role === 'ROLE_INACTIVE')
        if (inactiveUser) { throw new Error("You don't have permission.") }

        return response.data.token
      })
      .then(token => {
        dispatch('storeJwtToken', token)
        api.setAuthorizationHeader(token)
      })
  },
  async fetchUserDetails ({ commit, dispatch }) {
    const token = utils.getCurrentUserJwtToken()

    const decodedToken = JwtDecode(token)

    await userService.findByUUID(decodedToken.userId)
      .then(response => response.data.user)
      .then(user => {
        return {
          uuid: user.uuid,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          roles: user.access_info.roles.join(','),
          expireDate: decodedToken.exp
        }
      })
      .then(userDetails => {
        return dispatch('storeUserDetails', userDetails)
      })
      .then(() => {
        return commit('setAuthenticated', true)
      })
  },
  doLogout ({ commit }) {
    commit('setAuthenticated', false)
    utils.clearAuthStorage()
  },
  storeUserDetails ({ commit }, userDetails) {
    utils.storeCurrentUserDetails(userDetails)
  },
  storeJwtToken ({ commit }, token) {
    utils.storeCurrentUserJwtToken(token)
  }
}

export default {
  state,
  mutations,
  actions
}
