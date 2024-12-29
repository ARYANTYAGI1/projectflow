import { createStore } from 'vuex'
import layoutModule from './modules/layout'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'

const store = createStore({
  modules: {
    layout: layoutModule,
    app,
    errorLog,
    permission,
    tagsView,
    user
  },
  getters
})

export default store
