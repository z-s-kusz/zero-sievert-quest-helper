<script setup lang="ts">
import { ref } from 'vue';
import { useGetDBCollections } from '@/hooks/useGetDBCollections';

const emit = defineEmits(['addCollection']);
const selection = ref<any>({});
const { collections, error, isLoading } = useGetDBCollections();

const confirmSelection = (dialogActiveControl: any) => {
    emit('addCollection', selection.value);
    dialogActiveControl.value = false;
    selection.value = {};
};

const setSelection = (quest: any) => {
    selection.value = quest;
};

</script>

<template>
    <v-dialog width="auto" max-width="1080" scrollable>
        <!-- no idea how these undeclared 'props' and 'isActive' work in the dialog, but they work -->
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" color="secondary">Add Quest!</v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card title="Select Quest or Module" :loading="isLoading">
                <v-card-text>
                    <span v-if="error">{{ error }}</span>

                    <v-table class="">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Items/Tasks</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="quest in collections" :key="quest.id" @click="setSelection(quest)"
                                :class="selection.id === quest.id ? 'selected' : ''">
                                <td>{{ quest.name }}</td>
                                <td>
                                    <ul>
                                        <li v-for="item in quest.items" :key="item.id">{{ item.name }}: {{ item.count }}
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>

                <v-card-actions fixed>
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
