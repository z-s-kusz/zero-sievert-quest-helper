<script setup lang="ts">
import CollectionsList from '@/components/CollectionsList.vue';
</script>

<template>
    <v-app>
        <v-app-bar :elevation="2" title="Quest Helper">
            <template v-slot:append>
                <v-btn>Add Quest!</v-btn>
            </template>
        </v-app-bar>
        <v-main>
            <CollectionsList />
        </v-main>
</v-app>
</template>

<style scoped lang="scss"></style>
