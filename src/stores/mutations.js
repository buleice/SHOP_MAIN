import * as types from './mutations-type';

const mutations = {
    [types.SET_FIRSTVISIT](state, firstVisit) {
        state.firstVisit = firstVisit;
    },
    [types.SET_CLASSIFYID](state, classifyId) {
        state.classifyId = classifyId;
    },
    [types.SET_CATEGORY](state, category) {
        state.category = category;
    },
    [types.SET_AGE](state, age) {
        state.age = age;
    },
    [types.SETROUTERARRAY](state,arr){
        state.routerArr=arr
    },
    [types.SETNEWUSER](state,boo){
        state.newUser=boo
    },
    [types.SETSHOWTABBAR](state,boo){
        state.showTabBar=boo
    }

}
export default mutations
