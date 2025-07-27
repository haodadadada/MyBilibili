<template>
    <div class="container">
        <div class="content" v-if="isLogin">
            <Header></Header>
            <Tab></Tab>
            <History></History>
        </div>
        <div class="not-login" v-else>
            <div>请先登录</div>
            <img src="@/assets/other/theme-failed.png" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">
    import useStores from '@/stores/index';
    import Header from './Header/index.vue';
    import Tab from './Tab/index.vue';
    import History from './Main/index.vue';
    const { userStore } = useStores();
    const { isLogin } = userStore;
</script>

<style lang="scss" scoped>
   ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: var(--bg2-float);
    }
    ::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    .container {
        height: calc(100vh - var(--nav-height));
        .content {
            width: 100%;
            height: 100%;
            padding: 30px;
            box-sizing: border-box;
            overflow-y: scroll;
        }
        .not-login {
            color: var(--theme-text-color);
        }
    }
</style>