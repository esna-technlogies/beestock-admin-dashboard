import router from '../../router'

export const redirectTo = (routeName, alertType = '', alertMessage = '') => {
  router.push({
    name: routeName,
    params: {
      alertType,
      alertMessage
    }
  })
}
