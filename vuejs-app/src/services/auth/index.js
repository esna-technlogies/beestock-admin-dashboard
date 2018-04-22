import store from '../../store'
import formUrlEncoded from 'form-urlencoded'

import api from '../../api/beestock'
import {userRoles} from '../../config'
import { userSecurity as userSecurityEndpoint } from '../../api/beestock/endpoints'


const login = (queryParams = {}) => {
  const url = userSecurityEndpoint.login
  return api.post(url, formUrlEncoded(queryParams))
}

const isAuthenticated = () => {
  return store.getters.isAuthenticatedUser === true
}

const isVerifiedUser = () => {
  return !store.getters.currentUserRoles().includes(userRoles.INACTIVE)
}

const isJwtTokenExpired = () => {
  const expireDate = store.getters.jwtTokenExpireDate()
  return expireDate < new Date()
}

export default {
  login,
  isAuthenticated,
  isVerifiedUser,
  isJwtTokenExpired
}
