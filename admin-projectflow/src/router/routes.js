import store from '@/state/store'
import path from 'path'

export default [
  {
    path: '/login',
    name: 'Login',
    component: () => {
      return import('../views/pages/account/login.vue')
    },
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        if (store.getters['auth/loggedIn']) {
          next({ name: 'home' })
        } else {
          next()
        }
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => {
      return import('../views/pages/account/register.vue')
    }
  },
  {
    path: '/forgot-password',
    name: 'Forgot-password',
    component: () => {
      return import('../views/pages/account/forgot-password.vue')
    },
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        if (store.getters['auth/loggedIn']) {
          next({ name: 'home' })
        } else {
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
        store.dispatch('LogOut')
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          (route) => route.push('/login')
        )
        next(authRequiredOnPreviousRoute ? { name: 'home' } : { ...routeFrom })
      }
    }
  },
  {
    path: '/account/verify',
    name: 'VerifyAccount',
    component: () => {
      return import('../views/pages/account/verify-account.vue')
    }
  },
  {
    path: '/',
    name: 'Dashboard',
    meta: {
      authRequired: true,
      userType: [1,2,3,4]
    },
    component: () => {
      return import('../views/pages/dashboard/index.vue')
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      authRequired: true,
      userType: [1,2,3,4]
    },
    component: () => {
      return import('../views/pages/profile/profile.vue')
    }
  },
  {
    path: '/profile/update',
    name: 'UpdateProfile',
    meta: {
      authRequired: true,
      userType: [1,2,3,4]
    },
    component: () => {
      return import('../views/pages/profile/updateProfile.vue')
    }
  },
  {
    path: '/users',
    name: 'Users',
    meta: {
      authRequired: true,
      userType: [1,2,3,4]
    },
    component: () => {
      return import('../views/pages/users/index.vue')
    }
  },
  {
    path: '/users/create',
    name: 'CreateUser',
    meta: {
      authRequired: true,
      userType: [1,2,3,4]
    },
    component: () => {
      return import('../views/pages/users/create.vue')
    }
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    meta: {
      authRequired: true,
      userType: [1,2,3,4]
    },
    component: () => {
      return import('../views/pages/change-password.vue')
    }
  },
  {
    path: '/project',
    name: 'Project',
    meta: {
      authRequired: true,
      userType: [1,2,3]
    },
    component: () => {
      return import('../views/pages/project/index.vue')
    }
  },
  {
    name: 'CreateProject',
    path: '/project/create',
    meta: {
      authRequired: true,
      userType: [1],
    },
    component: () => import('../views/pages/project/create.vue'),
  },
  {
    name: 'Update Project',
    path: '/project/create/:id',
    meta: {
      authRequired: true,
      userType: [1,2,3]
    },
    component: () => {
      return import('../views/pages/project/create.vue')
    }
  },
  {
    path: '/tasks',
    name: 'Tasks',
    meta: {
      authRequired: true,
      userType: [1,2,3]
    },
    component: () => {
      return import('../views/pages/tasks/index.vue')
    }
  },
  {
    name: 'CreateTask',
    path: '/tasks/create',
      meta: {
        authRequired: true,
        userType: [1,2,3]
      },
      component: () => {
        return import('../views/pages/tasks/create.vue')
      }
  },
]
