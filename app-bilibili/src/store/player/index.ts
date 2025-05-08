export default{
    namespaced: true,
    state: {
        commonSetting: [
            { name: '镜像画面', isOpen: true, id: 0 },
            { name: '单集循环', isOpen: false, id: 1 },
            { name: '列表循环', isOpen: false, id: 2 },
        ],
        otherSetting: [
            { name: '播放方式', option: ['自动切集', '播完暂停'], curIndex: 0, id: 0 },
            { name: '视频比例', option: ['自动', '4:3', '16:9'], curIndex: 0, id: 1 },
            { name: '播放策略', option: ['默认', 'AV1', 'HEVC', 'AVC'], curIndex: 0, id: 2 },
            { name: '音量均衡', option: ['标准', '高动态', '关闭'], curIndex: 2, id: 3 }
        ],
        videoCodecid: {
            'AVC': 7,
            'HEVC': 12,
            'AV1': 13,
        }
    },
    getters: {

    },
    mutations: {
        updateCommonSetting(state: any, payload: { id: number }) {
            const index = state.commonSetting.findIndex((item: { id: number }) => item.id === payload.id);
            if (index !== -1) {
                state.commonSetting[index].isOpen = !state.commonSetting[index].isOpen;
            }
        },
        updateOtherSetting(state: any, payload: { id: number, index: number }) {
            const index = state.otherSetting.findIndex((item: { id: number }) => item.id === payload.id);
            if (index !== -1) {
                state.otherSetting[index].curIndex = payload.index;
            }
        }
    }
};
  