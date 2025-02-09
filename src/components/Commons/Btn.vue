<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  highlightMode: Boolean,
  text: String,
  onClick: Function
});

const handleClick = () => {
  if (props.onClick) {
    props.onClick({ highlightMode: props.highlightMode, text: props.text });
  }
};
</script>

<template>
  <button
    :class="{ 'btn-highlight': props.highlightMode, 'btn-default': !props.highlightMode }"
    @click="handleClick"
  >
    {{ props.text }}
  </button>
</template>

<style scoped>
:root {
  --main-color: #3498db;
  --text-color: #333;
}

button {
  padding: 10px 20px;

  width: 100%;
  min-width: 13rem;

  font-size: 16px;

  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.btn-highlight {
  background-color: var(--main-color);
  color: var(--text-color);
  border: none;
}

.btn-default {
  background-color: white;
  color: var(--main-color);
  border: 2px solid var(--main-color);
}

.btn-highlight:hover,
.btn-default:hover {
  filter: brightness(1.2);
}
</style>
