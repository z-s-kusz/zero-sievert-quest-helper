<script setup lang="ts">
import { ref } from 'vue';
import Item from '@/types/item';
import lootJSON from '@/data/loot';

interface Props {
    item: Item;
}
const props = defineProps<Props>();
const emit = defineEmits(['saveItem', 'removeItem']);

const name = ref(props.item.name);
const count = ref(props.item.count);

// TODO remember why I split items into categories instead of an array of all, what future work did I have in mind?
const lootCats = JSON.parse(lootJSON);
const loot: string[] = [];
Object.keys(lootCats).forEach((key) => {
    loot.push(...lootCats[key]);
});

const save = () => {
    const countAsInt = count.value ? parseInt(`${count.value}`, 10) : 1;
    const updatedItem = {
        id: props.item.id,
        name: name.value.trim(),
        count: countAsInt,
        editing: false,
        completed: false,
    };
    emit('saveItem', updatedItem);
}

const remove = () => {
    emit('removeItem', props.item.id);
};
</script>

<template>
    <form class="flex" @submit.prevent="save">
        <v-combobox hide-details class="mr-1 name" v-model="name" :items="loot" density="compact" spellcheck="false">
        </v-combobox>
        <v-text-field hide-details class="mx-1 count" label="Count" v-model="count" type="number"
            density="compact"></v-text-field>
        <v-btn class="mx-1" icon="mdi-delete-circle-outline" @click.prevent="remove" color="error"></v-btn>
        <v-btn type="submit" class="ml-1" icon="mdi-content-save-outline" color="primary"></v-btn>
    </form>
</template>

<style scoped lang="scss">
.flex {
    display: flex;
}

.name {
    min-width: 198px
}

.count {
    max-width: 78px;
}
</style>
