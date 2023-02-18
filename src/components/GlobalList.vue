<script setup lang="ts">
import CollectionType from '@/types/collection';
import { computed } from 'vue';

interface Props {
    collections: CollectionType[];
}
interface PartialItems {
    name: string;
    count: number;
}

const props = defineProps<Props>();
const collections = props.collections;

const allItems = computed((): PartialItems[] => {
    const itemsByName: string[] = [];
    const items: PartialItems[] = [];
    collections.forEach((collection) => {
        collection.items.forEach((item) => {
            if (item.name.trim() === '') return;

            const alreadyAddedIndex = itemsByName.findIndex((itemByName) => itemByName === item.name);
            const itemCount = item.count || 1;
            if (alreadyAddedIndex !== -1) {
                items[alreadyAddedIndex].count += itemCount;
            } else {
                itemsByName.push(item.name);
                items.push({
                    name: item.name,
                    count: itemCount,
                });
            }
        });
    });
    return items;
});

</script>

<template>
    <v-card title="All Quest Items" class="small-card">
        <v-card-text>
            <ul>
                <li v-for="(item, i) in allItems" :key="i">{{ item.name }} * {{ item.count }}</li>
            </ul>
        </v-card-text>
    </v-card>
</template>

<style scoped lang="scss">
.small-card {
    max-width: 500px;
    margin: 1rem;
}
</style>