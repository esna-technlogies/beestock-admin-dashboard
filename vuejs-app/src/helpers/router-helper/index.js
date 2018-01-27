import router from '../../router'

let findCategoryFailed = (status) => {
  const alertType = 'danger'
  const alertMessage = `alerts.messages.findCategory.${status}`
  pushTo('Categories', alertType, alertMessage)
}

let addCategoryDone = (status) => {
  const alertType = [200, 201, 202, 204].includes(status) ? 'success' : 'danger'
  const alertMessage = `alerts.messages.addCategory.${status}`
  pushTo('Categories', alertType, alertMessage)
}

let deleteCategoryDone = (status) => {
  const alertType = [200, 201, 202, 204].includes(status) ? 'success' : 'danger'
  const alertMessage = `alerts.messages.deleteCategory.${status}`
  pushTo('Categories', alertType, alertMessage)
}

let findUserFailed = (status) => {
  const alertType = 'danger'
  const alertMessage = `alerts.messages.findUser.${status}`
  pushTo('Users', alertType, alertMessage)
}

let deleteUserDone = (status) => {
  const alertType = [200, 201, 202, 204].includes(status) ? 'success' : 'danger'
  const alertMessage = `alerts.messages.deleteUser.${status}`
  pushTo('Users', alertType, alertMessage)
}

let pushTo = (routeName, alertType, alertMessage) => {
  router.push({
    name: routeName,
    params: {
      alertType: alertType,
      alertMessage: alertMessage
    }
  })
}

export default {
  findCategoryFailed,
  addCategoryDone,
  deleteCategoryDone,
  findUserFailed,
  deleteUserDone
}
