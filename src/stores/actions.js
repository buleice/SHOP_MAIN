import * as types from './mutations-type';
export const setFirstVisit=({commit,state},firstVisit)=>{
  commit(types.SET_FIRSTVISIT,firstVisit);
}

export const setScrollRefresh=({commit,state},isScrollRefresh)=>{
    commit(types.SET_SCROOLLREFRESH,isScrollRefresh);
}
