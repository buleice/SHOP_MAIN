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
export const setCategory=({commit,state},category)=>{
    commit(types.SET_CATEGORY,category)
}

export const setDirection=({commit,state},direction)=>{
    commit(types.SET_SETVIEWDIRECTION,direction)
}
