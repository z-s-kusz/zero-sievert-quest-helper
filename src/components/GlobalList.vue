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

const allItems = computed((): PartialItems[] => {
    const itemsByName: string[] = [];
    const items: PartialItems[] = [];
    props.collections.forEach((collection) => {
        collection.items.forEach((item) => {
            if (item.completed || item.name === '') return;

            const alreadyAddedIndex = itemsByName.findIndex((itemByName) => itemByName === item.name.toLowerCase());
            const itemCount = item.count || 1;
            if (alreadyAddedIndex !== -1) {
                items[alreadyAddedIndex].count += itemCount;
            } else {
                itemsByName.push(item.name.toLowerCase());
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
    <v-card title="All Quest Items" class="small-card" color="secondary">
        <v-card-text>
            <ul class="list-container">
                <li v-for="(item, i) in allItems" :key="i">{{ item.name }} * {{ item.count }}</li>
            </ul>
            <div v-if="allItems.length === 0">
                <p>This section will list totals of all the items you need for all quests.</p>
                <p>Click "Add Quest!" in the top right corner to get started.</p>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped lang="scss">
.small-card {
    max-width: 500px;
    margin: 1rem;
    min-width: 198px;
}

.list-container {
    list-style-position: inside;

    li {
        font-weight: bold;
    }
}

p {
    max-width: 198px;
}</style>
