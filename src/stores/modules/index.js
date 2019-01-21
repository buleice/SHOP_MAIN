const moduleIndex =
    {
        namespaced: true,
        state: {
            indexPageData: {},
        },
        actions: {
            setIndexPageData({commit, state}, data) {
                commit('SETINDEXPAGEDATA', data)
            }
        },
        mutations: {
            SETINDEXPAGEDATA(state, data) {
                state.indexPageData = data;
            },
        },
        getters: {
            indexPageData:state=>state.indexPageData
        },
    }

export default moduleIndex;

