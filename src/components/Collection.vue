<script setup lang="ts">
import ItemContainer from './item/ItemContainer.vue';
import CollectionType from '@/types/collection';

interface Props {
    collection: CollectionType;
}
const props = defineProps<Props>();
const collection = props.collection;
const items = collection.items;
</script>

<template><ItemContainer v-for="item in items" :item="item"></ItemContainer></template>
