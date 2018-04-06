import { redirectTo } from './route'

const logoutDone = () => {
  const alertType = 'success'
  const alertMessage = `alerts.messages.logout.200`
  redirectTo('Login', alertType, alertMessage)
}

export {
  logoutDone
}
