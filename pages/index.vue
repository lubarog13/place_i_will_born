

<script setup lang="ts">
  import WorldMap from "~/components/main/WorldMap.vue";
  import {useCountriesStore} from "~/stores/countries";

  definePageMeta({
    layout: 'default'
  })

  const store = useCountriesStore();
  store.setCountriesList();

</script>

<template>
  <div class="container mx-auto">
    <ClientOnly>
      <WorldMap></WorldMap>
      <template #fallback>
        <USkeleton class="h-96 w-full" />
      </template>
    </ClientOnly>
    <div class="container__content mt-10">
      <h3>Press button below to generate random country</h3>
      <button class="base-btn" @click="store.generateRandomCountry()">Generate</button>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>