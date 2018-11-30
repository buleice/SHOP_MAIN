import * as types from './mutations-type';
export const setFirstVisit=({commit},firstVisit)=>{
  commit(types.SET_FIRSTVISIT,firstVisit);
}

export const setScrollRefresh=({commit},isScrollRefresh)=>{
    commit(types.SET_SCROOLLREFRESH,isScrollRefresh);
}
export const setClassifyId=({commit},classifyId)=>{
    commit(types.SET_CLASSIFYID,classifyId);
}
export const setCategory=({commit},category)=>{
    commit(types.SET_CATEGORY,category)
}

export const setDirection=({commit},direction)=>{
    commit(types.SET_SETVIEWDIRECTION,direction)
}
export const setDiyList=({commit},diy)=>{
    commit(types.SET_DIYLIST,diy)
}
