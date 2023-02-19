<script lang="ts">
import { defineComponent } from 'vue';
import {  } from 'vuetify';

interface Item {
  label: string,
  value: string,
}

export default defineComponent({
  data() {
    return {
      items: [] as Item[],
      item: '',
    };
  },
  methods: {
    addItem() {
      this.items.push({
        label: this.item.trim(),
        value: this.item.trim(),
      });
      this.item = '';
    },
    removeItem(removeIndex: number) {
      this.items = this.items.filter((item, i) => i !== removeIndex);
    },
    makeFinalJSON() {
      const json = JSON.stringify(this.items);
      console.log(json);
    },
  },
});
</script>

<template>
  <section>
    <h1>Make a JSON list of Options for Selects (results in console)</h1>
  <form @submit.prevent="addItem()" class="flex">
    <v-text-field hide-details label="Item Name" v-model="item"></v-text-field>
    <v-btn icon="mdi-add" color="primary"></v-btn>
  </form>
  <v-btn @click="makeFinalJSON()">Generate JSON</v-btn>
  <h1>Items:</h1>
  <ol>
    <li v-for="(item, i) in items" :key="item.label" class="item">
      {{ item.label }} <v-btn @click="removeItem(i)" icon="mdi-subtract" color="secondary"></v-btn>
    </li>
  </ol>
  </section>
</template>

<style scoped lang="scss">
.flex {
  display: flex;
  gap: 2rem;
}

section { 
  padding: 2rem;
}

.item {
  display: flex;
  justify-content: space-between;
  max-width: 300px;
  align-items: center;
  margin: 1rem;
}
</style>
