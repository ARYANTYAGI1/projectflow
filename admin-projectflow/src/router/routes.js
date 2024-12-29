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
    // meta: {
    //     beforeResolve(routeTo, routeFrom, next) {
    //         console.log('Resolving Register route');
    //     },
    // },
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
    // meta: {
    //   beforeResolve(routeTo, routeFrom, next) {
    //     console.log('Resolving VerifyAccount route')
    //     if (store.getters['auth/loggedIn']) {
    //       console.log('User is already logged in, redirecting to home')
    //       next({ name: 'home' })
    //     } else {
    //       console.log('Proceeding to VerifyAccount')
    //       next()
    //     }
    //   }
    // }
  },
  {
    path: '/',
    name: 'Users',
    meta: {
      authRequired: true,
      userType: [1]
    },
    component: () => {
      return import('../views/pages/users/index.vue')
    }
  },
  {
    path: '/users/create',
    name: 'addUser',
    meta: {
      authRequired: true,
      userType: [1]
    },
    component: () => {
      return import('../views/pages/users/create.vue')
    }
  },
  {
    path: '/users/view/:id',
    name: 'userDetail',
    meta: {
      authRequired: true,
      userType: [1]
    },
    component: () => {
      return import('../views/pages/users/view.vue')
    }
  },
  {
    path: '/users/create/:id',
    name: 'updateUser',
    meta: {
      authRequired: true,
      userType: [1]
    },
    component: () => {
      return import('../views/pages/users/create.vue')
    }
  },
  {
    path: '/device',
    name: 'Devices',
    meta: {
      authRequired: true,
      userType: [1, 2]
    },
    component: () => {
      return import('../views/pages/devices/index.vue')
    }
  },
  {
    path: '/device/create',
    name: 'addDevice',
    meta: {
      authRequired: true,
      userType: [1, 2]
    },
    component: () => {
      return import('../views/pages/devices/create.vue')
    }
  },
  {
    path: '/device/create/:id',
    name: 'updateDevice',
    meta: {
      authRequired: true,
      userType: [1, 2]
    },
    component: () => {
      return import('../views/pages/devices/create.vue')
    }
  },
  {
    path: '/measurements',
    name: 'Measurements',
    meta: {
      authRequired: true,
      userType: [1, 2]
    },
    component: () => {
      return import('../views/pages/measurements/index.vue')
    }
  },
  {
    path: '/measurement/create',
    name: 'addMeasurement',
    meta: {
      authRequired: true,
      userType: [1, 2]
    },
    component: () => {
      return import('../views/pages/measurements/create.vue')
    }
  },
  {
    path: '/measurement/create/:id',
    name: 'updateMeasurement',
    meta: {
      authRequired: true,
      userType: [1, 2]
    },
    component: () => {
      return import('../views/pages/measurements/create.vue')
    }
  },
  {
    path: '/faqs',
    name: 'FAQ',
    meta: {
      authRequired: true
    },
    component: () => {
      console.log('Loading FAQ component')
      return import('../views/pages/utility/faqs.vue')
    }
  },
  {
    path: '/profile',
    name: 'Pprofile',
    meta: {
      authRequired: true
    },
    component: () => {
      console.log('Loading Profile component')
      return import('../views/pages/profile/Profile.vue')
    }
  },
  {
    path: '/update/profile',
    name: 'updatePprofile',
    meta: {
      authRequired: true
    },
    component: () => {
      console.log('Loading Update-profile component')
      return import('../views/pages/profile/updateProfile.vue')
    }
  },
  {
    path: '/change-password',
    name: 'changePpassword',
    meta: {
      authRequired: true
    },
    component: () => {
      console.log('Loading Change-password component')
      return import('../views/pages/changePassword/changePassword.vue')
    }
  },
  {
    path: '/settings',
    name: 'Setting',
    meta: {
      authRequired: true,
      userType: [1]
    },
    component: () => {
      return import('../views/pages/setting/index.vue')
    }
  },
  {
    path: '/settings/create-key',
    name: 'addKey',
    meta: {
      authRequired: true,
      userType: [1]
    },
    component: () => {
      return import('../views/pages/setting/create-key.vue')
    }
  },
  {
    path: '/settings/create-key/:id',
    name: 'UpdateKey',
    meta: {
      authRequired: true,
      userType: [1]
    },
    component: () => {
      return import('../views/pages/setting/create-key.vue')
    }
  },
  {
    path: '/settings/create-appkey',
    name: 'addAppKey',
    meta: {
      authRequired: true,
      userType: [1]
    },
    component: () => {
      return import('../views/pages/setting/create-appkey.vue')
    }
  },
  {
    path: '/settings/create-appkey/:id',
    name: 'UpdateAppKey',
    meta: {
      authRequired: true,
      userType: [1]
    },
    component: () => {
      return import('../views/pages/setting/create-appkey.vue')
    }
  },
  // Define wildcard route for handling 404 errors
  {
    path: '/:catchAll(.*)',
    component: () => {
      console.log('Loading Error-404 component')
      return import('../views/pages/utility/error-404.vue')
    }
  }
]
