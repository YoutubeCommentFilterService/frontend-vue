<script setup lang="ts">
import Inp from "@/components/Commons/Inp.vue";
import Btn from "@/components/Commons/Btn.vue";
import Tag from "@/components/Commons/Tag.vue";

const InputOnChangeFunc = () => {
  console.log("change Input");
};

const BtnClick01 = () => {
  console.log("Btn01 click");
};
</script>

<template>
  <section>
    <h1>Welcome to Test Web Site</h1>
    <h2>this is Sub Text</h2>

    <Inp placeholder="test" @onchange="InputOnChangeFunc" />

    <div class="btn-group">
      <Btn :highlight-mode="false" text="Log In" @on-click="BtnClick01" />
      <Btn :highlight-mode="true" text="Sign up" @on-click="BtnClick01" />
    </div>

    <div class="tag-group">
      <Tag text="test01" />
      <Tag text="test02" />
      <Tag text="test03" />
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;

  width: 100%;

  align-items: center;
}

.btn-group {
  display: flex;
  padding: 1.3rem 3rem;
  gap: 0.8rem;

  justify-content: center;
}

.tag-group {
  display: flex;
  padding: 1.3rem 3rem;
  gap: 1.3rem;

  justify-content: center;
}
</style>
