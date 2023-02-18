import CollectionType from "@/types/collection";

const key = 'my-collections';

function clearCollections() {
	localStorage.removeItem(key);
}

function setCollections(collections: CollectionType[]) {
	const collectionsJSON = JSON.stringify(collections);
	localStorage.setItem(key, collectionsJSON);
}

function getCollectionsFromStorage(): CollectionType[] {
	const collections = localStorage.getItem(key);
	if (collections) {
		return JSON.parse(collections);
	}
	return [];
}

export { clearCollections, setCollections, getCollectionsFromStorage };