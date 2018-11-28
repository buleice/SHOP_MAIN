import * as types from './mutations-type';
export const setFirstVisit=({commit,state},firstVisit)=>{
  commit(types.SET_FIRSTVISIT,firstVisit);
}

export const setScrollRefresh=({commit,state},isScrollRefresh)=>{
    commit(types.SET_SCROOLLREFRESH,isScrollRefresh);
}
export const setClassifyId=({commit,state},classifyId)=>{
    commit(types.SET_CLASSIFYID,classifyId);
}
