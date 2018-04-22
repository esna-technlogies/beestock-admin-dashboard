import {redirectTo} from './route'

const findPhotoFailed = (status) => {
  const alertType = [200, 201, 202, 204].includes(status) ? 'success' : 'danger'
  const alertMessage = `alerts.messages.findPhoto.${status}`
  redirectTo('Photos', alertType, alertMessage)
}

const deletePhotoDone = (status) => {
  const alertType = [200, 201, 202, 204].includes(status) ? 'success' : 'danger'
  const alertMessage = `alerts.messages.deletePhoto.${status}`
  redirectTo('Photos', alertType, alertMessage)
}

export {
  findPhotoFailed,
  deletePhotoDone
}
