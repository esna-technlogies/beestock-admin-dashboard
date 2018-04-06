import {redirectTo} from './route'

const findUserFailed = (status) => {
  const alertType = 'danger'
  const alertMessage = `alerts.messages.findUser.${status}`
  redirectTo('Users', alertType, alertMessage)
}

const deleteUserDone = (status) => {
  const alertType = [200, 201, 202, 204].includes(status) ? 'success' : 'danger'
  const alertMessage = `alerts.messages.deleteUser.${status}`
  redirectTo('Users', alertType, alertMessage)
}

export {
  findUserFailed,
  deleteUserDone
}
