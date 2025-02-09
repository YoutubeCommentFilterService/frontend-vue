<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  placeholder: String,
  onchange: Function
});

const handleChange = (event: Event) => {
  if (props.onchange) {
    props.onchange(event);
  }
};
</script>

<template>
  <input
    :placeholder="props.placeholder"
    @change="handleChange"
  />
</template>

<style scoped>
  input {
    padding: 0.8rem;

    width: 100%;
    max-width: 33rem;

    font-size: 1rem;

    border: 2px solid #ccc;
    border-radius: 12px;

    outline: none;
    transition: border-color 0.3s ease;
  }

  input:focus {
    border-color: var(--main-color);
  }
</style>
