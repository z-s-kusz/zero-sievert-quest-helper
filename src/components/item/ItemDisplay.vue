<script setup lang="ts">
import Item from '@/types/item';
import { computed } from 'vue';

interface Props {
    item: Item;
}
const props = defineProps<Props>();
const emit = defineEmits(['saveItem']);
const item = props.item;
const editItem = () => {
    const updatedItem = {
        ...item,
        editing: true,
    };
    emit('saveItem', updatedItem);
};
const updateStatus = () => {
    const updatedItem = {
        ...item,
        completed: !item.completed,
    };
    emit('saveItem', updatedItem);
};
const itemClass = computed(() => {
    return item.completed ? 'strike-through' : '';
});
const label = computed(() => {
    return `${item.name} * ${item.count || 1}`;
});
</script>

<template>
    <div class="flex">
        <v-checkbox v-model="item.completed" @click="updateStatus">
            <template v-slot:label>
                <span :class="itemClass">{{ label }}</span>
            </template>
        </v-checkbox>
        <v-btn icon="mdi-pencil-outline" @click="editItem" class="mx-2"></v-btn>
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
</style>
