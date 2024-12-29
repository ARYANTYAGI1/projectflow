import { getUserInfo, loginByUsername } from '@/api/login'
import { getToken, setToken, removeToken, setRole, removeRole } from '@/utils/auth'
import Cookies from 'js-cookie'


const user = {
  state: {
    user: '',
    status: '',
    token: getToken(),
    name: Cookies.get('name'),
    picture: Cookies.get('picture'),
    userType: Cookies.get('userType'),
    userid: Cookies.get('userid'),
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
    SET_NAME: (state, name) => {
      state.name = name
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
  },
  actions: {
    loginByUsername({ commit }, userInfo) {
      console.log(userInfo)
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo.email, userInfo.password).then(response => {
          console.log(response)
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
          console.log(data)
          commit('SET_USERID', data._id)
          commit('SET_LOGGEDIN', true)
          commit('SET_IS_PROILE_COMPLETE', data.isProfileComplete)
          commit('SET_EMAIL', data.email)
          commit('SET_USERTYPE', data.userType)
          commit('SET_NAME', data.fullName)
          commit('SET_PICTURE', data.picture)
          Cookies.set('userid', data._id)
          Cookies.set('isLoggedIn', true)
          Cookies.set('isProfileComplete', data.isProfileComplete)
          Cookies.set('name', data.fullName)
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
