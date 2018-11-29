import * as types from './mutations-type';

const mutations = {
    [types.SET_FIRSTVISIT](state, firstVisit) {
        state.firstVisit = firstVisit;
    },
    [types.SET_SCROOLLREFRESH](state, isScrollRefresh) {
        state.isScrollRefresh = isScrollRefresh;
    },
    [types.SET_CLASSIFYID](state, classifyId) {
        state.classifyId = classifyId;
    },
    [types.SET_CATEGORY](state, category) {
        state.category = category;
    },
    [types.SET_SETVIEWDIRECTION](state, direction) {
        state.direction = direction;
    },

}
export default mutations
