<template>
    <div class="tab flex">
        <span
            v-for="item of tabBtnList"
            :key="item.index"
            class="tab-btn" 
            :class="{ 'tab-btn-active': tabActiveIndex === item.index }"
            ref="tabBtn"
            @click="handleClickTabBtn(item.index)"
        >{{ item.name }}</span>
        <span 
            v-if="tabBtnList.length"
            class="tab-line" 
            ref="tabLine"
        ></span>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    interface TabBtn {
        name: string;
        index: number;
    }

    let tabBtn = ref<HTMLElement[] | null>(null);
    let tabBtnList = ref<TabBtn[]>([
        { name: '历史记录', index: 0 },
        { name: '我的收藏', index: 1 }
    ]);
    let tabLine = ref<HTMLElement | null>(null);
    let tabActiveIndex = ref<number>(0);
    const handleClickTabBtn = (index: number) => {
        tabActiveIndex.value = index;
        moveTabLine(index);
    };
    const moveTabLine = (activeIndex: number) => {
        if(tabBtn.value && tabLine.value) {
            const tabBtnWidth = tabBtn.value[0].offsetWidth;
            const ratio = 1 / 4;
            const leftOffset = Math.floor(tabBtnWidth * ( 1 / 2 - ratio / 2 ));
            tabLine.value.style.width = `${ Math.floor(tabBtnWidth * ratio) }px`;
            tabLine.value.style.left = `${ activeIndex * tabBtnWidth + leftOffset }px`;
        }
    };
    onMounted(() => {
        moveTabLine(tabActiveIndex.value);
    });
</script>

<style lang="scss" scoped>
.tab {
    position: relative;
    .tab-btn {
        padding: 8px 7px;
        font-weight: 500;
        font-size: 15px;
        color: var(--theme-text-color);
        cursor: pointer;
        transition: .3s;
        &:hover {
            color: var(--brand-pink);
        }
    }
    .tab-btn-active {
        color: var(--brand-pink);
    }
    .tab-line {
        position: absolute;
        bottom: 0;
        background-color: var(--brand-pink);
        border-radius: 999px;
        height: 3px;
        transition: .3s;
    }
}
</style>