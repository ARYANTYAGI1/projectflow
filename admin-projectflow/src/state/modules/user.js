import { getUserInfo, loginByUsername } from '@/api/login'
import { getToken, setToken, removeToken, setRole, removeRole } from '@/utils/auth'
import Cookies from 'js-cookie'


const user = {
  state: {
    user: '',
    status: '',
    token: getToken(),
    fullName: Cookies.get('fullName'),
    picture: Cookies.get('picture'),
    userType: Cookies.get('userType'),
    userid: Cookies.get('userid'),
    firstName: Cookies.get('firstName'),
    socialType: Cookies.get('socialType'),
    email: Cookies.get('email'),
    isLoggedIn: Cookies.get('isLoggedIn'),
    ispasswordchanged: Cookies.get('ispasswordchanged'),
    isProfileComplete: Cookies.get('isProfileComplete')
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_USERID: (state, userid) => {
      state.userid = userid
    },
    SET_LOGGEDIN: (state, isLoggedIn) => {
      state.isLoggedIn = isLoggedIn
    },
    SET_FULLNAME: (state, fullName) => {
      state.fullName = fullName
    },
    SET_FIRSTNAME: (state, firstName) => {
      state.firstName = firstName
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_PICTURE: (state, picture) => {
      state.picture = picture
    },
    SET_IS_CHANGED_PASSWORD: (state, ispasswordchanged) => {
      state.ispasswordchanged = ispasswordchanged
    },
    SET_IS_PROILE_COMPLETE: (state, isProfileComplete) => {
      state.isProfileComplete = isProfileComplete
    },
    SET_USERTYPE: (state, userType) => {
      state.userType = userType
    },
    SET_SOCIALTYPE: (state, socialType) => {
      state.socialType = socialType
    }
  },
  actions: {
    loginByUsername({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo.email, userInfo.password).then(response => {
          commit('SET_TOKEN', response.data.token)
          setToken(response.data.token)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // Get user information
    GetUserInfo({ commit, state }) {
      if (state.token === 'undefined') {
        return false
      }
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) {
            reject('Verification failed, please login again.')
          }
          const data = response.data.data
          commit('SET_USERID', data._id)
          commit('SET_LOGGEDIN', true)
          commit('SET_IS_PROILE_COMPLETE', data.isProfileComplete)
          commit('SET_FULLNAME', data.fullName)
          commit('SET_FIRSTNAME', data.firstName)
          commit('SET_EMAIL', data.email)
          commit('SET_USERTYPE', data.userType)
          commit('SET_SOCIALTYPE', data.socialType)
          commit('SET_PICTURE', data.picture)
          Cookies.set('userid', data._id)
          Cookies.set('isLoggedIn', true)
          Cookies.set('isProfileComplete', data.isProfileComplete)
          Cookies.set('fullName', data.fullName)
          Cookies.set('firstName', data.firstName)
          Cookies.set('email', data.email)
          Cookies.set('userType', data.userType)
          Cookies.set('socialType', data.socialType)
          Cookies.set('picture', data.picture)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateChangePassword({ commit }, opts) {
      return new Promise((resolve, reject) => {
        commit('SET_IS_CHANGED_PASSWORD', opts.isPasswordChanged)
        Cookies.set('ispasswordchanged', opts.isPasswordChanged)
        resolve(opts)
      })
    },
    updateIsProfileComplete({ commit }, opts) {
      return new Promise((resolve, reject) => {
        commit('SET_IS_PROILE_COMPLETE', opts.isProfileComplete)
        Cookies.set('isProfileComplete', opts.isProfileComplete)
        resolve(opts)
      })
    },
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        Cookies.remove('loggedin')
        Cookies.remove('userType')
        localStorage.clear()
        removeToken()
        resolve()
      })
    }
  }
}

export default user
