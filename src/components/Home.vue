<script setup lang="ts">
import { reactive, watch } from 'vue';
import Collection from '@/components/Collection.vue';
import CollectionsDialog from '@/components/CollectionsDialog.vue';
import { setCollections, getCollectionsFromStorage } from '@/utility/collections-storage';
import { v4 as uuidv4 } from 'uuid';
import GlobalList from './GlobalList.vue';
import CollectionType from '@/types/collection';

const collections = reactive(getCollectionsFromStorage());
watch(collections, (newCollections, prevCollections) => {
    setCollections(newCollections);
});
const addCollection = () => {
    collections.push({
        name: '',
        id: uuidv4(),
        items: [],
        editing: true,
    });
};
const addCollectionFromDB = (collection: CollectionType) => {
    const newCollection = {
        ...collection,
        id: uuidv4()
    };
    collections.push(newCollection)
};
const removeCollection = (id: string) => {
    const index = collections.findIndex((collections) => collections.id === id);
    collections.splice(index, 1);
};
</script>

<template>
    <v-app>
        <v-app-bar :elevation="2" title="Quest Helper">
            <template v-slot:append>
                <CollectionsDialog @add-collection="addCollectionFromDB"></CollectionsDialog>
                <!-- todo fix verbage on existing vs making new empty list btns -->
                <v-btn @click="addCollection" color="primary">Create New Quest!</v-btn>
            </template>
        </v-app-bar>
        <v-main class="collection-container">
            <GlobalList :collections="collections" />
            <Collection v-for="collection in collections" :collection="collection" :key="collection.id"
                @remove-collection="removeCollection"></Collection>
        </v-main>
    </v-app>
</template>

<style scoped lang="scss">
.collection-container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
}
</style>
