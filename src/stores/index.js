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
import moduleClassify from './modules/classify'
import moduleAddress from './modules/address'
import moduleBinkCard from './modules/bank-card'
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
        moduleIndex, //主页面
        moduleClassify, //分类页面
        moduleAddress, //地址管理
        moduleBinkCard //银行卡绑定信息
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
