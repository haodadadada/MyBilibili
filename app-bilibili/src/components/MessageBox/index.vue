<template>
    <div 
        class="custom-alert" 
        ref="messageBoxRef"
        :style="{ '--duration': props.duration && typeof props.duration === 'number' ? props.duration + 'ms' : '1s' }"
    >
        <span>{{ props.message }}</span>
    </div>
</template>

<script setup lang="ts">
    import { ref, nextTick, onMounted } from 'vue';
    const props = defineProps(['message', 'duration']);
    let messageBoxRef = ref<HTMLElement | null>(null);
    let close: (() => void) | null = null;
    onMounted(async () => {
        await nextTick();
        if(!messageBoxRef.value) return;
        messageBoxRef.value.addEventListener('animationend', () => {
            close?.();
        });
    });
    defineExpose({ onClose: (fn: () => void) => (close = fn) });
</script>

<style lang="scss" scoped>
    @keyframes slideUpFade {
        0% {
            transform: translate(-50%, 20px);
            opacity: 0;
        }
        20% {
            transform: translate(-50%, -50%);
            opacity: 1;
        }
        80% {
            transform: translate(-50%, -50%);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%);
            opacity: 0;
        }
    }

    .custom-alert {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 13px;
        background: #333;
        padding: 12px 10px;
        box-sizing: border-box;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        text-align: left;
        z-index: 1000;
        animation: slideUpFade var(--duration, 1s) ease forwards;
        min-width: 50px;
        max-width: 300px;
    }
</style>