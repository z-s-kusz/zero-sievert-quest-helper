<script setup lang="ts">
import Item from '../../types/item';
import ItemEdit from './ItemEdit.vue';
import ItemDisplay from './ItemDisplay.vue';
interface Props {
    item: Item;
}
const props = defineProps<Props>();
defineEmits(['saveItem', 'removeItem']);
</script>

<template>
    <ItemEdit v-if="props.item.editing" :item="props.item" @save-item="$emit('saveItem', $event)"
        @remove-item="$emit('removeItem', $event)" />
    <ItemDisplay v-else :item="props.item" @save-item="$emit('saveItem', $event)" />
</template>
