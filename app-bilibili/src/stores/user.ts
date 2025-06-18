import { defineStore } from 'pinia';

interface UserInfo {
    current_level?: number;
    face?: string;
    mid?: number;
    uname?: string;
};

interface UserState {
    userInfo: UserInfo;
    isLogin: boolean;
    isLight: boolean;
    sessdata: string;
    buvid3: string;
    wbi_key: {
        img_key: string;
        sub_key: string;
    };
};

const useUserStore = defineStore('user', {
    state: (): UserState => ({
        userInfo: {
            current_level: 0,
            face: '',
            mid: 0,
            uname: ''
        } as UserInfo,
        isLogin: false,
        isLight: true,
        sessdata: '',
        buvid3: '',
        wbi_key: {
            img_key: '',
            sub_key: ''
        }
    }),
    actions: {
        updateUserInfo(value: UserInfo) {
            this.userInfo = {
              ...this.userInfo,
              ...value
            };
        },
        clearUserInfo() {
            this.userInfo = {};
        },
        updateUserLoginState(value: boolean) {
            this.isLogin = value;
        },
        updateUserLight(value: boolean) {
            this.isLight = value;
        },
        updateSessdata(value: string) {
            this.sessdata = value;
        },
        clearSessdata() {
            this.sessdata = '';
        },
        updateWbiKey(value: { img_key: string; sub_key: string }) {
            const { img_key, sub_key } = value;
            this.wbi_key.img_key = img_key;
            this.wbi_key.sub_key = sub_key;
        },
        clearWbiKey() {
            this.wbi_key.img_key = '';
            this.wbi_key.sub_key = '';
        },
        updateBuvid3(value: string) {
            this.buvid3 = value;
        },
        clearBuvid3() {
            this.buvid3 = '';
        }
    },
    persist: true
});

export default useUserStore;
