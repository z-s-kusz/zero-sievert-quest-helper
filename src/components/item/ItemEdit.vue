<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue'
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
const inputType: Ref<'autocomplete' | 'input'> = ref('autocomplete');

const lootCats = JSON.parse(lootJSON);
const loot = [
    ...lootCats.common,
    ...lootCats.electronics,
    ...lootCats.tools,
    ...lootCats.scrap,
    ...lootCats.valuables,
    ...lootCats.fauna,
    ...lootCats.crystals,
].map((item) => item.label);

const save = () => {
    const countAsInt = count.value ? parseInt(`${count.value}`, 10) : 0;
    const updatedItem = {
        id: item.id,
        name: name.value,
        count: countAsInt,
        editing: false,
        completed: false,
    };
    emit('saveItem', updatedItem);
}

const remove = () => {
    emit('removeItem', item.id);
};
const toggleInputType = () => {
    inputType.value = inputType.value === 'autocomplete' ? 'input' : 'autocomplete';
};
const noDataText = 'Click the typewriter to add custom value';
</script>

<template>
    <form class="flex" @submit.prevent="save">
        <v-autocomplete v-if="inputType === 'autocomplete'" :no-data-text="noDataText"
            hide-details class="mr-1 name" v-model="name" :items="loot" density="compact" spellcheck="false">
        </v-autocomplete>
        <v-text-field v-else hide-details class="mr-1 name" v-model="name" density="compact"></v-text-field>

        <v-text-field  hide-details class="mx-1 count" label="Count" v-model="count" type="number" density="compact"></v-text-field>
        <v-btn class="mx-1" icon="mdi-delete-circle-outline" @click.prevent="remove"  color="error"></v-btn>
        <v-btn class="mx-1" icon="mdi-typewriter" @click.prevent="toggleInputType" color="secondary"></v-btn>
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
