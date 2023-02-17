<script setup lang="ts">
import Item from '../../types/item';
import ItemEdit from './ItemEdit.vue';
import ItemDisplay from './ItemDisplay.vue';
interface Props {
    item: Item;
}
const props = defineProps<Props>();
const item = props.item;
</script>

<template>
    <ItemEdit v-if="item.editing" :item="item" />
<ItemDisplay v-else :item="item" />
</template>
