import auth from '../services/auth'
import {routeConditions} from '../config/index'


const userIsNotAuthenticated = (to, from, next) => {
  return next({name: 'Login', query: {path: to.fullPath}})
}

// const userIsNotVerified = (to, from, next) => {
//   return next({ name: 'VerifyUser' })
// }

const beforeEachRoute = (to, from, next) => {
  const { VERIFIED_USER, AUTHENTICATED_USER, NO_LOGIN } = routeConditions

  const conditions = to.meta.conditions ? to.meta.conditions : []

  for (const condition of conditions) {
    switch (condition) {
      case VERIFIED_USER:
      case AUTHENTICATED_USER:
        if (!auth.isAuthenticated()) { return userIsNotAuthenticated(to, from, next) }

        // if (!auth.isVerifiedUser()) { return userIsNotVerified(to, from, next) }
        break

      case NO_LOGIN:
        if (auth.isAuthenticated()) { return next({ name: 'Dashboard' }) }
        break
    }
  }

  return next()
}

export default beforeEachRoute
