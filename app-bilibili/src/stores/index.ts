import useUserStore from './user';
import usePlayerStore from './player';

// 统一导出useStore方法
// this 只能在 actions 中安全使用 Pinia 会把 actions 绑定为方法，所以 this 正常指向 store
export default function useStores() {
    return {
        userStore: useUserStore(),
        playerStore: usePlayerStore()
    };
}; 