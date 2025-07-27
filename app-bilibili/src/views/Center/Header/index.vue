<template>
    <div class="header flex">
        <div class="left flex items-center">
            <img
                v-if="face"
                :src="face" 
                alt="" 
                class="mr-10"
            >
            <component 
                v-else 
                :is="AvatarDefault" 
                class="mr-10"
            ></component>
            <div 
                class="flex items-center justify-between flex-1 h-full">
                <div class="flex flex-col">
                    <div class="flex items-center font-[600] mb-5 text-[17px]">
                        <span class="mr-5 uname">{{ uname }}</span> 
                        <component 
                            v-if="levelIcons"
                            :is="levelIcons" 
                            class="member-icon"
                            style="width: 30px; height: 30px;"
                        ></component>
                        <div class="vip text-[13px]">大会员</div>
                    </div>
                    <div class="coins text-[13px]">硬币: {{ coins }}</div>
                </div>
                <div class="stat flex mr-30 items-center">
                    <div class="flex flex-col items-center pr-25 pl-25">
                        <span class="text-[18px] count">{{ dynamicCount }}</span>
                        <span class="text-[13px]">动态</span>
                    </div>
                    <div class="line"></div>
                    <div class="flex flex-col items-center pr-25 pl-25">
                        <span class="text-[18px] count">{{ fansCount }}</span>
                        <span class="text-[13px]">关注</span>
                    </div>
                    <div class="line"></div>
                    <div class="flex flex-col items-center pr-25 pl-25">
                        <span class="text-[18px] count">{{ friendCount }}</span>
                        <span class="text-[13px]">粉丝</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="right"></div>
    </div>
</template>

<script setup lang="ts">
    import { ref, Ref, shallowRef, onMounted } from 'vue';
    import useStores from '@/stores/index';
    import { getUserStat, getOwnInfo } from '@/api/user';
    import AvatarDefault from '@/assets/icon/side/avatar_default.svg';
    const { userStore } = useStores();
    const { sessdata, userInfo: { face = '', uname = '', current_level: currentLevel } } = userStore;

    const images = import.meta.glob('../../../assets/icon/other/*.svg', { eager: false });
    const levelIconsPath = [
        '../../../assets/icon/other/level_0.svg',
        '../../../assets/icon/other/level_1.svg',
        '../../../assets/icon/other/level_2.svg',
        '../../../assets/icon/other/level_3.svg',
        '../../../assets/icon/other/level_4.svg',
        '../../../assets/icon/other/level_5.svg',
        '../../../assets/icon/other/level_6.svg',
    ];
    let levelIcons: Ref<unknown> = shallowRef(null);
    let friendCount: Ref<number | null> = ref(null);
    let fansCount: Ref<number | null> = ref(null);
    let dynamicCount: Ref<number| null> = ref(null);
    let coins: Ref<number | null> = ref(null);
    let isVip: Ref<boolean> = ref(false);
    const fetchUserStat = async () => {
        try {
            const response: any = await getUserStat(sessdata);
            const data = response.data.data;
            dynamicCount.value = data.dynamic_count || null;
            friendCount.value = data.follower || null;
            fansCount.value = data.following || null;
        } catch(error) {
            console.log('获取用户导航信息失败:', error);
        };
    };
    const fetchOwnInfo = async () => {
        try {
            const response: any = await getOwnInfo(sessdata);
            const data = response.data.data;
            coins.value = data.coins || null;
            isVip.value = data.vip.status === 0 ? false : true;
        } catch(error) {
            console.log('获取用户信息失败:', error);
        };
    };
    onMounted(async () => {
        if (currentLevel != null && images[levelIconsPath[currentLevel]]) {
            const mod: any = await images[levelIconsPath[currentLevel]]();
            levelIcons.value = mod.default;
        } else {
            levelIcons.value = null;
        };
        fetchUserStat();
        fetchOwnInfo();
    });
</script>

<style lang="scss" scoped>
    .header {
        padding: 20px;
        background-color: var(--bg3-float);
        .left {
            width: 100%;
            height: 60px;
            color: var(--theme-text-color);
            img {
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }
            svg {
                width: 30px;
                height: 30px;
            }
            .uname, .vip, .stat .count {
                color: var(--theme-text-color);
            }
            .stat .count {
                cursor: pointer;
                transition: .3s;
                &:hover {
                    color: var(--brand-pink);
                }
            }
            .coins {
                color: var(--text2-color);
            }
            .stat {
                height: 100%;
                color: var(--text2-color);
            }
            .line {
                width: 1px;
                height: 40%;
                background-color: #aaa;
            }
        }
    }
</style>