import { getToken } from '@/utils/auth'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import store from '@/state/store'
import i18n from '@/i18n'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, left: 0 }
  }
})

router.afterEach((to, from) => {
  const {t} = i18n.global
  if (to.meta && to.name) {
    document.title = t(to.name) + ' | ProjectFlow' || to.name
  }
})
// Before each route evaluates...
router.beforeEach((routeTo, routeFrom, next) => {
  document.title = routeTo.name ? `${routeTo.name} | ProjectFlow` : 'ProjectFlow'

  const publicPages = ['/login', '/forgot-password', '/account/verify', '/register']
  const authPage = !publicPages.includes(routeTo.path)
  const loggedUser = getToken()
  const userType = store.getters['userType']
  if (loggedUser && !authPage) {
    return next('/')
  }
  if (authPage && !loggedUser) {
    console.log('User is not authenticated, redirecting to login')
    return next('/login')
  }
  // Convert both to Number for consistent comparison
  const userTypeNum = Number(userType);
  const allowedUserTypes = routeTo.meta.userType?.map(Number);
  // Check user type access
  if (allowedUserTypes && !allowedUserTypes.includes(userTypeNum)) {
    if(userTypeNum == 1) {
      return next('/');
    }
    else {
      return next ('/device')
    }
  }
  next()
})

router.beforeResolve(async(routeTo, routeFrom, next) => {
  console.log('Resolving route to', routeTo.path)
  try {
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            if (args.length) {
              next(...args)
              reject(new Error('Redirected'))
            } else {
              resolve()
            }
          })
        } else {
          resolve()
        }
      })
    }
  } catch (error) {
    console.error('Error during route resolution:', error)
    return
  }
  next()
})

export default router
