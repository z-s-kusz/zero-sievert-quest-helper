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
const items = props.collection.items;
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
    const itemRef = props.collection.items.find((item) => item.id === updatedItem.id);
    if (!itemRef) return console.error('item not found!'); // needed for typescript
    itemRef.completed = updatedItem.completed;
    itemRef.count = updatedItem.count;
    itemRef.editing = updatedItem.editing;
    itemRef.name = updatedItem.name;
};
const removeItem = (id: string) => {
    const index = props.collection.items.findIndex((item) => item.id === id);
    props.collection.items.splice(index, 1);
};
const addNewItem = () => {
    const newItem = {
        ...defaultItem,
        id: uuidv4(),
    }
    props.collection.items.push(newItem);
};

const collectionName = ref(props.collection.name);
const saveCollection = () => {
    props.collection.name = collectionName.value;
    props.collection.editing = false;
};
const toggleEditCollection = () => {
    props.collection.editing = !props.collection.editing;
};
const removeCollection = () => {
    emit('removeCollection', props.collection.id);
};
</script>

<template>
    <v-fade-transition>
        <v-card class="small-card">
            <v-card-title>
                <span v-if="!props.collection.editing">{{ props.collection.name }}</span>
                <div v-else class="flex">
                    <v-text-field label="Quest Name" class="quest-name" v-model="collectionName"
                        @keydown.enter="saveCollection" hide-details density="compact"></v-text-field>
                    <v-btn class="ml-1" icon="mdi-delete-circle-outline" @click="removeCollection" color="error"></v-btn>
                </div>
            </v-card-title>
            <v-card-text>
                <ItemContainer v-for="item in items" :key="item.id" :item="item" @save-item="saveItem"
                    @remove-item="removeItem"></ItemContainer>
            </v-card-text>
            <v-card-actions>
                <v-btn v-if="!props.collection.editing" @click="toggleEditCollection" color="secondary">Edit/Remove
                    Quest</v-btn>
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
