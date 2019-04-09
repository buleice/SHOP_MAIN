const moduleAddress =
    {
        namespaced: true,
        state: {
            shippingAddress:[],
            defaultAddress:{}
        },
        actions: {
            setShippingAddress({commit,state},list){
                commit('SETSHIPPINGADDRESS',list)
              },
              setDefaultAddress({commit,state},address){
                commit('SETDEFAULTADDRESS',address)
              }
        },
        mutations: {
            SETSHIPPINGADDRESS(state,list){
                state.shippingAddress=list;
              },
              SETDEFAULTADDRESS(state,address){
                state.defaultAddress=address;
              },
        },
        getters:{
            shippingAddress:state=>state.shippingAddress,
            defaultAddress:state=>state.defaultAddress
        },
    }

export default moduleAddress;

