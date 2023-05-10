<script setup lang="ts">
import Item from '@/types/item';
import { computed } from 'vue';

interface Props {
    item: Item;
}
const props = defineProps<Props>();
const emit = defineEmits(['saveItem']);
const editItem = () => {
    const updatedItem = {
        ...props.item,
        editing: true,
    };
    emit('saveItem', updatedItem);
};
const updateStatus = () => {
    const updatedItem = {
        ...props.item,
        completed: !props.item.completed,
    };
    emit('saveItem', updatedItem);
};
const itemClass = computed(() => {
    return props.item.completed ? 'strike-through' : '';
});
const label = computed(() => {
    return `${props.item.name} * ${props.item.count || 1}`;
});
</script>

<template>
    <div class="flex">
        <v-checkbox hide-details v-model="props.item.completed" @click="updateStatus" class="mr-1 checkbox-container">
            <template v-slot:label>
                <span :class="itemClass">{{ label }}</span>
            </template>
        </v-checkbox>
        <v-btn icon="mdi-pencil-outline" @click="editItem" class="ml-1" color="secondary" variant="text"></v-btn>
    </div>
</template>

<style scoped lang="scss">
.flex {
    display: flex;
    justify-content: space-between;
}

.strike-through {
    text-decoration: line-through;
}

.checkbox-container {
    min-width: 198px;
}
</style>
