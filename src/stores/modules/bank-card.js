const moduleBinkCard =
    {
        namespaced: true,
        state: {
          cancash:0,
          cardinfo:{},//银行卡信息
          cashing:0,
          wantCash:''
        },
        actions: {
          setCanCash({commit,state},cancash){
              commit('SET_CANCASH',cancash);
            },
          setCardInfo({commit,state},cardinfo){
            commit('SET_CARDINFO',cardinfo);
          },
          setCashing({commit,state},cashing){
            commit('SET_CASHING',cashing);
          },
          setWantCash({commit,state},wantCash){
            commit('STE_WANTCASH',wantCash);
          }
        },
        mutations: {
            SET_CANCASH(state,cancash){
              state.cancash=cancash;
            },
            SET_CARDINFO(state,cardinfo){
              state.cardinfo=cardinfo;
            },
            SET_CASHING(state,cashing){
              state.cashing=cashing
            },
              STE_WANTCASH(state,wantCash){
              state.wantCash=wantCash
            }
        },
        getters:{        
            cancash:state=>state.cancash,
            cardinfo:state=>state.cardinfo,
            cashing:state=>state.cashing,
            wantCash:state=>state.wantCash,
        },
    }

export default moduleBinkCard;

