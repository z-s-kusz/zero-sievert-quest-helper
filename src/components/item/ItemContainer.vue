<script setup lang="ts">
import Item from '../../types/item';
import ItemEdit from './ItemEdit.vue';
import ItemDisplay from './ItemDisplay.vue';
interface Props {
    item: Item;
}
const props = defineProps<Props>();
defineEmits(['saveItem', 'removeItem']);
const item = props.item;
</script>

<template>
    <ItemEdit v-if="item.editing" :item="item" @save-item="$emit('saveItem', $event)"
        @remove-item="$emit('removeItem', $event)" />
    <ItemDisplay v-else :item="item" @save-item="$emit('saveItem', $event)" />
</template>
