import { defineStore } from 'pinia';

interface CommonSettingItem {
    name: string;
    isOpen: boolean;
    id: number;
};

interface OtherSettingItem {
    name: string;
    option: string[];
    curIndex: number;
    id: number;
};

interface VideoCodecid {
    AVC: number;
    HEVC: number;
    AV1: number;
};


const usePlayerStore = defineStore('player', {
    state: () => ({
        commonSetting: [
            { name: '镜像画面', isOpen: false, id: 0 },
            { name: '单集循环', isOpen: false, id: 1 },
            { name: '列表循环', isOpen: false, id: 2 },
        ] as CommonSettingItem[],
        otherSetting: [
            { name: '播放方式', option: ['自动切集', '播完暂停'], curIndex: 0, id: 0 },
            { name: '视频比例', option: ['自动', '4:3', '16:9'], curIndex: 0, id: 1 },
            { name: '播放策略', option: ['默认', 'AV1', 'HEVC', 'AVC'], curIndex: 0, id: 2 },
            { name: '音量均衡', option: ['标准', '高动态', '关闭'], curIndex: 2, id: 3 }
        ] as OtherSettingItem[],
        videoCodecid: {
            'AVC': 7,
            'HEVC': 12,
            'AV1': 13,
        } as VideoCodecid
    }),
    actions: {
        updateCommonSetting(payload: { id: number }) {
            const index = this.commonSetting.findIndex((item: { id: number }) => item.id === payload.id);
            if (index !== -1) {
                this.commonSetting[index].isOpen = !this.commonSetting[index].isOpen;
            }
        },
        updateOtherSetting(payload: { id: number, index: number }) {
            const index = this.otherSetting.findIndex((item: { id: number }) => item.id === payload.id);
            if (index !== -1) {
                this.otherSetting[index].curIndex = payload.index;
            }
        }
    },
    persist: true
});

export default usePlayerStore;