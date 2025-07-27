import useStores from '@/stores';
import { getWebId } from '@/api/home/index';
const { userStore } = useStores();
const { sessdata, updateWebId } = userStore;
export default async function getAndSaveWebId(): Promise<void> {
    const response = await getWebId(sessdata);
    const doc = new DOMParser().parseFromString(response.data.data, 'text/html');
    const scripts = Array.from(doc.querySelectorAll('script'));
    for (const script of scripts) {
        const content = script.textContent;
        if (content && content.includes('window._render_data_')) {
            const match = content.match(/window\._render_data_\s*=\s*(\{[\s\S]*?\})\s*setTimeout/);
            if (match && match[1]) {
                const webId = JSON.parse(match[1])?.access_id || '';
                updateWebId(webId);
                return;
            };
        };
    };
};