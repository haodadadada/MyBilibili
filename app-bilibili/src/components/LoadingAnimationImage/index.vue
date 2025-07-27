<template>
    <div 
        class="animation-image-wrap"
        :style="{ width: props.width, height: props.height }"
    >
        <div
            v-if="loading"
            class="animation-image-loading"
        >
            <slot name="loading">
                <div class="animation-default"></div>
            </slot>
        </div>
        <img 
            v-show="props.src && !loading"
            :src="props.src" 
            :width="props.width" 
            :height="props.height" 
            :alt="alt" 
            :style="imgStyle"
            class="animation-image"
            @load="handleImgLoaded"
            @error="handleImgError"
        >
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    const props = defineProps({
        src: {
            type: String,
            required: true
        },
        width: {
            type: [String, Number],
            default: '100%'
        },
        height: {
            type: [String, Number],
            default: '100%'
        },
        style: {
            type: Object,
            default: () => {}
        },
        alt: {
            type: String,
            default: ''
        }
    });
    const loading = ref(true);
    const handleImgLoaded = () => {
        loading.value = false;
    };
    const handleImgError = () => {
        if(props.src) {
            loading.value = false;
        };
    };
    const imgStyle = ref({
        ...props.style
    });
</script>

<style lang="scss" scoped>
    .animation-image-wrap {
        position: relative;
    }

    .animation-image-loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #f3f3f3;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .animation-default {
        width: 30px;
        height: 30px;
        border: 2px solid #ccc;
        border-top-color: #666;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
    .animation-image {
        width: 100%;
        height: 100%;
    }
</style>