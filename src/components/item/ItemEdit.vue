<script setup lang="ts">
import { ref } from 'vue';
import Item from '@/types/item';
import lootJSON from '@/data/loot';

interface Props {
    item: Item;
}
const props = defineProps<Props>();
const emit = defineEmits(['saveItem', 'removeItem']);
const item = props.item;

const name = ref(item.name);
const count = ref(item.count);

const lootCats = JSON.parse(lootJSON);
const loot = [...lootCats.common, ...lootCats.electronics, ...lootCats.tools, ...lootCats.scrap].map((item) => item.label);

const save = () => {
    const countAsInt = count.value ? parseInt(`${count.value}`, 10) : 0;
    const updatedItem = {
        id: item.id,
        name: name.value,
        count: countAsInt,
        editing: false,
        completed: item.completed, // auto set to false instead?
    };
    emit('saveItem', updatedItem);
}

const remove = () => {
    emit('removeItem', item.id);
};
</script>

<template>
    <div class="flex">
        <v-autocomplete class="mx-2" v-model="name" :items="loot" density="compact">
        </v-autocomplete>
        <v-text-field class="mx-2 count" label="Count" v-model="count" type="number" density="compact"></v-text-field>
        <v-btn icon="mdi-delete-circle-outline" @click="remove" class="mx-2"></v-btn>
        <v-btn class="mx-2" icon="mdi-content-save-outline" @click="save"></v-btn>
    </div>
</template>

<style scoped lang="scss">
.flex {
    display: flex;
}

.count {
    max-width: 80px;
}
</style>