import { createVNode, nextTick, render, VNode } from 'vue';
import MessageBox from '@/components/MessageBox/index.vue';

let instance: VNode | null = null;
let container: Element | null = null;
export default ({ message }: { message: string }) => {
    const close = () => {
        if (container) {
            render(null, container);
            nextTick(() => {
                if(container) {
                    document.body.removeChild(container);
                }
                instance = null;
            });
        }
    };
    if (!instance) {
        container = document.createElement('div');
        instance = createVNode(MessageBox, { message });
        render(instance, container);
        document.body.appendChild(container);
        instance.component!.exposed!.onClose(close);
    }

    return close;
};
