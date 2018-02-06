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
  roles
}
