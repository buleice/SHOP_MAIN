const moduleClassify =
    {
        namespaced: true,
        state: {
            themeIndex: 1000,
        },
        actions: {
            setThemeIndex({commit, state}, index) {
                commit('SETTHEMEINDEX', index)
            }
        },
        mutations: {
            SETTHEMEINDEX(state, index) {
                state.themeIndex = index;
            },
        },
        getters: {
            themeIndex:state=>state.themeIndex
        },
    }

export default moduleClassify;

