import store from '@/state/store'

export default [
  {
    path: '/login',
    name: 'Login',
    component: () => {
      console.log('Loading Login component')
      return import('../views/pages/account/login.vue')
    },
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        console.log('Resolving Login route')
        if (store.getters['auth/loggedIn']) {
          console.log('User is already logged in, redirecting to home')
          next({ name: 'home' })
        } else {
          console.log('Proceeding to Login')
          next()
        }
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => {
      console.log('Loading Register component')
      return import('../views/pages/account/register.vue')
    }
  },
  {
    path: '/forgot-password',
    name: 'Forgot-password',
    component: () => {
      console.log('Loading Forgot-password component')
      return import('../views/pages/account/forgot-password.vue')
    },
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        console.log('Resolving Forgot-password route')
        if (store.getters['auth/loggedIn']) {
          console.log('User is already logged in, redirecting to home')
          next({ name: 'home' })
        } else {
          console.log('Proceeding to Forgot-password')
          next()
        }
      }
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        console.log('Resolving Logout route')
        store.dispatch('LogOut')
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          (route) => route.push('/login')
        )
        console.log('User logged out, redirecting to', authRequiredOnPreviousRoute ? 'home' : routeFrom.path)
        next(authRequiredOnPreviousRoute ? { name: 'home' } : { ...routeFrom })
      }
    }
  },
  {
    path: '/account/verify',
    name: 'VerifyAccount',
    component: () => {
      console.log('Loading VerifyAccount component')
      return import('../views/pages/account/verify-account.vue')
    }
  },
  {
    path: '/',
    name: 'Dashboard',
    meta: {
      authRequired: true,
      userType: [1,2,3]
    },
    component: () => {
      return import('../views/pages/dashboard/index.vue')
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => {
      return import('../views/pages/users/index.vue')
    }
  },
  // {
  //   path: '/users/create',
  //   name: 'Users',
  //   component: () => {
  //     return import('../views/pages/users/create.vue')
  //   }
  // },
]
