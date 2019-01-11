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
export const setAge=({commit},age)=>{
    commit(types.SET_AGE,age)
}

export const setRouterArray=({commit,state},arr)=>{
    commit(types.SETROUTERARRAY,arr)
}
export const setNewUser=({commit,state},boo)=>{
    commit(types.SETNEWUSER,boo)
}
export const setShowTabBar=({commit,state},boo)=>{
    commit(types.SETSHOWTABBAR,boo)
}
