

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
      <h3 class="text-lg" v-if="!store.selectedCountry">In next life you will born in...</h3>
      <h3 class="text-lg" v-else>You will born in <span class="italic text-2xl">{{store.selectedCountry.name}}</span></h3>
      <UButton class="mt-3.5" :label="store.selectedCountry? 'No, regenerate!' : 'I want to now!'" @click="store.generateRandomCountry()" color="gray" variant="solid">
        <template #trailing>
          <UIcon v-if="!store.selectedCountry" name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
          <UIcon v-else name="i-heroicons-arrow-path-20-solid" class="w-5 h-5" />
        </template>
      </UButton>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>