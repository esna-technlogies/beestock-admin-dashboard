const menuItems = state => state.menu.items
const sidebarOpened = state => state.app.sidebar.opened
const toggleWithoutAnimation = state => state.app.sidebar.withoutAnimation
const config = state => state.app.config
const palette = state => state.app.config.palette
const isLoading = state => state.app.isLoading

const jwtTokenName = state => state.app.cookies.jwtTokenName
const beeStockApiBaseUrl = state => state.app.api.beeStock.baseURL
const userSecurityApi = state => state.app.api.beeStock.userSecurity
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
  userSecurityApi,
  roles
}
