import {redirectTo} from './route'

const findCategoryFailed = (status) => {
  const alertType = 'danger'
  const alertMessage = `alerts.messages.findCategory.${status}`
  redirectTo('Categories', alertType, alertMessage)
}

const addCategoryDone = (status) => {
  const alertType = [200, 201, 202, 204].includes(status) ? 'success' : 'danger'
  const alertMessage = `alerts.messages.addCategory.${status}`
  redirectTo('Categories', alertType, alertMessage)
}

const deleteCategoryDone = (status) => {
  const alertType = [200, 201, 202, 204].includes(status) ? 'success' : 'danger'
  const alertMessage = `alerts.messages.deleteCategory.${status}`
  redirectTo('Categories', alertType, alertMessage)
}

export {
  findCategoryFailed,
  addCategoryDone,
  deleteCategoryDone
}
