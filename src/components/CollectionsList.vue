<script setup lang="ts">
import Collection from '@/components/Collection.vue';
import CollectionType from '@/types/collection.js';
import { useLocalStorage } from '@vueuse/core';
import Item from '@/types/item';

const defaultItems = [{
    name: 'Test Item',
    count: 30,
    completed: false,
    editing: false,
}] as Item[];
const defaultCollections = [{
    name: 'Test Collection',
    complted: false,
    items: defaultItems,
}] as CollectionType[];
const collections = useLocalStorage('collections', defaultCollections);

</script>

<template><Collection v-for="collection in collections" :collection="collection"></Collection></template>

<style scoped lang="scss"></style>
