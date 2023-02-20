<script setup lang="ts">
import ItemContainer from './item/ItemContainer.vue';
import CollectionType from '@/types/collection';
import Item from '@/types/item';
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';

interface Props {
    collection: CollectionType;
}
const props = defineProps<Props>();
const emit = defineEmits(['removeCollection']);
const collection = props.collection;
const items = collection.items;
const defaultItem = {
    name: '',
    id: '',
    count: null,
    completed: false,
    editing: true,
};

const saveItem = (updatedItem: Item) => {
    // collection.items = collection.items.map((item) => { // can't do it this way, breaks reactivity
    //     if (item.id === updatedItem.id) return updatedItem;
    //     return item;
    // });
    const itemRef = collection.items.find((item) => item.id === updatedItem.id);
    if (!itemRef) return console.error('item not found!'); // needed for typescript
    itemRef.completed = updatedItem.completed;
    itemRef.count = updatedItem.count;
    itemRef.editing = updatedItem.editing;
    itemRef.name = updatedItem.name;
};
const removeItem = (id: string) => {
    const index = collection.items.findIndex((item) => item.id === id);
    collection.items.splice(index, 1);
};
const addNewItem = () => {
    const newItem = {
        ...defaultItem,
        id: uuidv4(),
    }
    collection.items.push(newItem);
};

const collectionName = ref(collection.name);
const saveCollection = () => {
    collection.name = collectionName.value;
    collection.editing = false;
};
const toggleEditCollection = () => {
    collection.editing = !collection.editing;
};
const removeCollection = () => {
    emit('removeCollection', collection.id);
};
</script>

<template>
    <v-fade-transition>
    <v-card class="small-card">
        <v-card-title>
            <span v-if="!collection.editing">{{ collection.name }}</span>
            <div v-else class="flex">
                <v-text-field label="Quest Name" class="quest-name" v-model="collectionName" @keydown.enter="saveCollection" hide-details density="compact"></v-text-field>
                <v-btn class="ml-1" icon="mdi-delete-circle-outline" @click="removeCollection" color="error"></v-btn>
            </div>
        </v-card-title>
        <v-card-text>
            <ItemContainer v-for="item in items" :key="item.id" :item="item" @save-item="saveItem"
                @remove-item="removeItem"></ItemContainer>
        </v-card-text>
        <v-card-actions>
            <v-btn v-if="!collection.editing" @click="toggleEditCollection" color="secondary">Edit/Remove Quest</v-btn>
            <v-btn v-else @click="saveCollection" color="primary">Save Quest</v-btn>
            <v-btn @click="addNewItem" color="primary">Add Item</v-btn>
        </v-card-actions>
    </v-card>
    </v-fade-transition>
</template>

<style scoped lang="scss">
.flex {
    display: flex;
    justify-content: space-between;
}
.quest-name {
    min-width: 198px;
}
.small-card {
    max-width: 500px;
    margin: 1rem;
    display: flex;
    flex-direction: column;
}
</style>
