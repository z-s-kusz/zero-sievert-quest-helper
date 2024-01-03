import { ref } from "vue";
import axios from 'axios';
import { useDBCollectionsCache } from '@/hooks/useDBCollectionsCache';
import CollectionType from "@/types/collection";
import { v4 as uuidv4 } from 'uuid';

export function useGetDBCollections() {
    const { setCollectionsLocalStore, getCollectionsLocalStore, shouldLoadFromNetwork } = useDBCollectionsCache();
    const collections = ref<any[]>([]);
    const error = ref('');
    const isLoading = ref(false);

    const addIds = (collections: CollectionType[]): CollectionType[] => {
        collections.forEach((collection) => {
            collection.id = uuidv4();
        });
        return collections;
    };

    const getCollections = (forceNetworkLoad = false) => {
        if (forceNetworkLoad || shouldLoadFromNetwork()) {
            isLoading.value = true;
            const url = '/.netlify/functions/get-quests';

            axios.get(url)
                .then((response: any) => {
                    const data = addIds(response.data);
                    setCollectionsLocalStore(data);
                    collections.value = data;
                    error.value = '';
                })
                .catch((error: any) => {
                    error.value = 'Error fetching collections from DB';
                    console.error(error);
                })
                .finally(() => {
                isLoading.value = false;
            });
        } else {
            collections.value = getCollectionsLocalStore();
        }
    };

    getCollections();

    return {
        collections,
        error,
        isLoading,
        getCollections,
    };
}
