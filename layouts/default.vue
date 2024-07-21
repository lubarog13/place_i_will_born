<script setup lang="ts">

import Header from "~/components/general/Header.vue";
import Footer from "~/components/general/Footer.vue";
</script>

<template>
<div>
  <Header>
  </Header>
  <main>
    <UContainer>
      <slot/>
    </UContainer>
  </main>
  <Footer></Footer>
</div>
</template>

<style scoped lang="scss">
</style>