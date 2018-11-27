import * as types from './mutations-type';
const mutations={
  [types.SET_FIRSTVISIT](state,firstVisit){
    state.firstVisit=firstVisit;
  },
  [types.SET_SCROOLLREFRESH](state,isScrollRefresh){
    state.isScrollRefresh=isScrollRefresh;
  }
}
export default mutations
