<script setup lang="ts">
import Item from '@/types/item';

interface Props {
    item: Item;
}
const props = defineProps<Props>();
const label = `${props.item.name} * ${props.item.count || 1}`
</script>

<template>
    <p>I am an item in read mode - you can still check me as complete</p>
<v-checkbox v-model="item.completed" :label="label"></v-checkbox>
</template>
