
export default{
    namespaced: true,
    state: {
        detailInfo: {},
    },
    getters: {

    },
    mutations: {
        changeDetailInfo(state: any, value: object) {
            state.detailInfo = value;
        },
        clearDetailInfo(state: any) {
            state.detailInfo = {};
        },
    }
  };
  