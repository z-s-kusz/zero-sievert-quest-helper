import CollectionType from "@/types/collection";

export function useDBCollectionsCache() {
    const collectionsKey = 'DbColletions';
    const timeKey = 'collectionsLastSavedTime';

    const setCollectionsLocalStore = (collections: CollectionType[]) => {
        const collectionsJson = JSON.stringify(collections);
        localStorage.setItem(collectionsKey, collectionsJson);

        const timeString = new Date().toLocaleString();
        localStorage.setItem(timeKey, timeString);
    };

    const getCollectionsLocalStore = (): CollectionType[] => {
        const collectionsJSON = localStorage.getItem(collectionsKey);
    
        if (collectionsJSON) {
            return JSON.parse(collectionsJSON) as CollectionType[];
        } else {
            return [];
        }
    };

    // cache for 24 hours
    const shouldLoadFromNetwork = (): boolean => {
        const now = new Date();
        const lastTimeLoadedString = localStorage.getItem(timeKey);

        if (lastTimeLoadedString) {
            const lastTimeLoaded = new Date(lastTimeLoadedString);
            // mutate last time loaded to 1 day later
            lastTimeLoaded.setHours(lastTimeLoaded.getHours() + 24);

            return now > lastTimeLoaded;
        } else {
            return true;
        }
    };

    return {
        setCollectionsLocalStore,
        getCollectionsLocalStore,
        shouldLoadFromNetwork,
    };
}
