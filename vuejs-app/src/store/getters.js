import utils from '../services/utils'

const menuItems = state => state.menu.items
const sidebarOpened = state => state.app.sidebar.opened
const toggleWithoutAnimation = state => state.app.sidebar.withoutAnimation
const config = state => state.app.config
const palette = state => state.app.config.palette
const isLoading = state => state.app.isLoading

const jwtTokenName = state => state.app.cookies.jwtTokenName
const beeStockApiBaseUrl = state => state.app.api.beeStock.baseURL
const userSecurityEndpoint = state => state.app.api.beeStock.userSecurity
const userAccountEndpoint = state => state.app.api.beeStock.userAccount
const categoryEndpoint = state => state.app.api.beeStock.category
const photoEndpoint = state => state.app.api.beeStock.photo
const roles = state => state.app.roles

const isPageLoading = state => state.app.isPageLoading
const isAuthenticatedUser = state => state.app.isAuthenticatedUser
const currentUserUUID = () => () => utils.getCurrentUserUUID()
const currentUserJwtToken = () => () => utils.getCurrentUserJwtToken()
const currentUserRoles = () => () => utils.getCurrentUserRoles()
const jwtTokenExpireDate = () => () => utils.getJwtTokenExpireDate()


export {
  menuItems,
  toggleWithoutAnimation,
  sidebarOpened,
  config,
  palette,
  isLoading,
  jwtTokenName,
  beeStockApiBaseUrl,
  userSecurityEndpoint,
  userAccountEndpoint,
  categoryEndpoint,
  photoEndpoint,
  roles,
  isPageLoading,
  isAuthenticatedUser,
  currentUserUUID,
  currentUserRoles,
  currentUserJwtToken,
  jwtTokenExpireDate
}
