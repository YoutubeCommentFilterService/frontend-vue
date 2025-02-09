<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  text: String,
});
</script>

<template>
  <div class="rounded-box">
    {{ props.text }}
  </div>
</template>

<style scoped>
:root {
  --sub-color: #f1c40f;
}

.rounded-box {
  display: flex;
  padding: 1rem;
  margin: 0 auto;

  max-width: 13rem;

  justify-content: center;
  align-items: center;

  background-color: var(--sub-color);

  border-radius: 12px;
  font-size: 1.2rem;
}
</style>
