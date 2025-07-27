<template>
    <div>
        <div class="header-bg-wrap">
            <LoadingAnimationImage
                :src="spaceBgUrl"
                :style="{ objectFit: 'cover', overflow: 'hidden', height: '100px' }"
                :height="'100px'"
            ></LoadingAnimationImage>
        </div>
   
            
        <div class="flex-between header">
            <div>
                <img :src="face" alt="" class="avatar">
            </div>
            <div>
                <div>关注数: {{ friend }}</div>
                <div>粉丝数: {{ fans }}</div>
                <div>获赞数: {{ like }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, Ref, onMounted } from 'vue';
    import useStores from '@/stores/index';
    import { getUserCard, getOwnInfo } from '@/api/user';
    import LoadingAnimationImage from '@/components/LoadingAnimationImage/index.vue';
    const { userStore } = useStores();
    const { sessdata, userInfo: { face = '', mid = '' } } = userStore;
    let spaceBgUrl = ref('');
    let friend: Ref<number | null> = ref(null);
    let fans: Ref<number | null> = ref(null);
    let like: Ref<number| null> = ref(null);
    const fetchUserCard = async () => {
        try {
            const response: any = await getUserCard({ mid, photo: true }, sessdata);
            const data = response.data.data;
            spaceBgUrl.value = data.space.l_img || '';
            friend.value = data.card.friend;
            like.value = data.like_num;
            fans.value = data.card.fans;
        } catch(error) {
            console.log('获取用户名片信息失败:', error);
        };
    };
    const fetchUserOwnInfo = async () => {
        try {
            await getOwnInfo(sessdata);
        } catch(error) {
            console.log('获取个人信息失败:', error);
        };
    };
    onMounted(async () => {
        await fetchUserCard();
        await fetchUserOwnInfo();
    });
</script>

<style lang="scss" scoped>
    .header {
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;
    }
    .header-bg-wrap {
        height: 100px;
        width: 100%;
    }

    .avatar {
        width: 70px;
        height: 70px;
        border-radius: 50%;
    }
</style>