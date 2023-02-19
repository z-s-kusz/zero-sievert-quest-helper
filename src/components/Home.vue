<script setup lang="ts">
import { reactive, watch } from 'vue';
import Collection from '@/components/Collection.vue';
import { setCollections, getCollectionsFromStorage } from '@/utility/collections-storage';
import { v4 as uuidv4 } from 'uuid';
import GlobalList from './GlobalList.vue';

const collections = reactive(getCollectionsFromStorage());
watch(collections, (newCollections, prevCollections) => {
    console.log('watch triggered');
    setCollections(newCollections);
});
const addCollection = () => {
    collections.push({
        name: '',
        id: uuidv4(),
        items: [],
        complted: false,
        editing: true,
    });
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
                <v-btn @click="addCollection" color="primary">Add Quest!</v-btn>
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
