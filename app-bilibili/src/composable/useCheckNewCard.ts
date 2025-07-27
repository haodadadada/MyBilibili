import { ref } from 'vue';
export function useCheckNewCard() {
    const curPlayerWindowOfVideo = ref<{ index: number, routePath: string } | null>(null);
    const checkIsNewVideo = (callback: (isNew: boolean) => unknown, index: number, routePath: string): void => {
        // 判断是否是新的视频
        const isNew = curPlayerWindowOfVideo.value ? curPlayerWindowOfVideo.value.index != index || curPlayerWindowOfVideo.value.routePath != routePath : true;
        curPlayerWindowOfVideo.value = { index, routePath };
        callback(isNew);
    };

    const curPlayerWindowOfLive = ref<{ index: number, routePath: string } | null>(null);
    const checkIsNewLive = (callback: (isNew: boolean) => unknown, index: number, routePath: string): void => {
        // 判断是否是新的直播
        const isNew = curPlayerWindowOfLive.value ? curPlayerWindowOfLive.value.index != index || curPlayerWindowOfLive.value.routePath != routePath : true;
        curPlayerWindowOfLive.value = { index, routePath };
        callback(isNew);
    };
    return {
        checkIsNewVideo,
        checkIsNewLive
    };
};