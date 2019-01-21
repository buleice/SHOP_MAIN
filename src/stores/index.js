import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
//修改日志
import createLogger from 'vuex/dist/logger'

//modules
import moduleIndex from './modules/index'

Vue.use(Vuex);
//设置debug
const debug = process.env.NODE_ENV !== 'production'


export default new Vuex.Store({
    namespaced: true,
    actions,
    getters,
    state,
    mutations,
    modules: {
        moduleIndex
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
