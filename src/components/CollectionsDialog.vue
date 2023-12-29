<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['addCollection']);
const selection = ref<any>({});
const confirmSelection = (dialogActiveControl: any) => {
    emit('addCollection', selection.value);
    dialogActiveControl.value = false;
    selection.value = {};
};
const quests = [
    {
        name: 'Test Quest',
        id: 1,
        editing: false,
        items: [
            {
                name: 'Fork',
                id: 1,
                count: 20,
                completed: false,
                editing: false,
            },
            {
                name: 'Spoon',
                id: 2,
                count: 3,
                completed: false,
                editing: false
            },
        ],
    },
    {
        name: 'Another One',
        id: 2,
        editing: false,
        items: [
            {
                name: 'Fork',
                id: 1,
                count: 20,
                completed: false,
                editing: false,
            },
            {
                name: 'Spoon',
                id: 2,
                count: 3,
                completed: false,
                editing: false
            },
            {
                name: 'TV',
                id: 3,
                count: 2,
                completed: false,
                editing: false,
            },
            {
                name: 'Wrench',
                id: 4,
                count: 5,
                completed: false,
                editing: false,
            },
            {
                name: 'Cooking Pot',
                id: 5,
                count: 1,
                completed: false,
                editing: false,
            },
        ],
    },
];

const setSelection = (quest: any) => {
    selection.value = quest;
};

</script>

<template>
    <v-dialog width="500">
        <!-- no idea how these undeclared 'props' and 'isActive' work in the dialog, but they work -->
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" color="secondary">Add Quest!</v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card title="Select Quest or Module">
                <v-table class="">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Items/Tasks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="quest in quests" :key="quest.id" @click="setSelection(quest)"
                            :class="selection.id === quest.id ? 'selected' : ''">
                            <td>{{ quest.name }}</td>
                            <td>
                                <ul>
                                    <li v-for="item in quest.items" :key="item.id">{{ item.name }}: {{ item.count }}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </v-table>

                <v-card-actions>
                    <v-btn @click="isActive.value = false">Cancel</v-btn>
                    <v-btn color="primary" variant="tonal" @click="confirmSelection(isActive)"
                        :disabled="!selection.id">Confirm</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped lang="scss">
.selected {
    background-color: purple;
}

li {
    display: inline-block;
    padding: 0 0.5rem;
}
</style>
