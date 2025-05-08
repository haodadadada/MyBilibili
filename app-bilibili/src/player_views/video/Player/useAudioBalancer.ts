// useAudioBalancer.ts
import { ref, Ref, watch, onUnmounted } from 'vue';

export type AudioBalanceMode = 'off' | 'balance' | 'detail'

export function useAudioBalancer(videoRef: Ref<HTMLVideoElement | null>, mode = ref<AudioBalanceMode>('off')) {
    const init = () => {
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(videoRef.value as HTMLVideoElement);
        const gainNode = audioCtx.createGain();
        const compressor = audioCtx.createDynamicsCompressor();
        const analyser = audioCtx.createAnalyser();
        const dataArray = new Uint8Array(analyser.fftSize);
        let rafId: number | null = null;
        // 默认连接方式
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
    
        function setupCompressor() {
            compressor.threshold.value = -40;
            compressor.knee.value = 30;
            compressor.ratio.value = 4;
            compressor.attack.value = 0.01;
            compressor.release.value = 0.25;
        }
    
        function autoGainAdjust() {
            analyser.getByteTimeDomainData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                const v = (dataArray[i] - 128) / 128;
                sum += v * v;
            }
            const rms = Math.sqrt(sum / dataArray.length);
            const target = 0.05;
            const gain = target / (rms || 0.001);
            gainNode.gain.value = Math.min(Math.max(gain, 0.5), 2);
    
            rafId = requestAnimationFrame(autoGainAdjust);
        }
    
        function cleanup() {
            source.disconnect();
            compressor.disconnect();
            gainNode.disconnect();
            analyser.disconnect();
            if (rafId) cancelAnimationFrame(rafId);
        }
    
        function applyMode(newMode: AudioBalanceMode) {
            cleanup();
    
            source.disconnect();
            compressor.disconnect();
            gainNode.disconnect();
            analyser.disconnect();
    
            switch (newMode) {
                case 'off':
                    source.connect(audioCtx.destination);
                    break;
    
                case 'balance':
                    source.connect(gainNode);
                    gainNode.connect(analyser);
                    analyser.connect(audioCtx.destination);
                    rafId = requestAnimationFrame(autoGainAdjust);
                    break;
    
                case 'detail':
                    setupCompressor();
                    source.connect(compressor);
                    compressor.connect(gainNode);
                    gainNode.connect(analyser);
                    analyser.connect(audioCtx.destination);
                    rafId = requestAnimationFrame(autoGainAdjust);
                    break;
            }
        }
        watch(mode, (newVal) => {
            if (audioCtx.state === 'suspended') audioCtx.resume();
            applyMode(newVal);
        }, { immediate: true });
        onUnmounted(() => cleanup());
    };
    watch(() => videoRef.value, (el) => {
        if(el) {
            init();
        }
    }, { immediate: true });

    return { mode, setMode: (val: AudioBalanceMode) => mode.value = val };
}
