<template>
  <div class="map">
  <form>
    <fieldset>
      <label for="opacity">Layer Opacity</label>
      <input
          type="range"
          id="opacity"
          min="0"
          max="1"
          step="0.1"
          v-model.number="opacity"
      />
      <span class="description">{{ opacity }}</span>
    </fieldset>
  </form>
  <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      ref="vectorMapRef"
      style="height: 500px"
  >
    <ol-view
        ref="view"
        :center="center"
        :zoom="zoom"
        :projection="projection"
        :constrainRotation="16"
    />

    <ol-interaction-select
        @select="featureSelected"
        :condition="selectCondition"
        :filter="selectInteactionFilter"
    >
      <ol-style>
        <ol-style-stroke color="green" :width="3"></ol-style-stroke>
        <ol-style-fill color="rgba(255,255,255,0.5)"></ol-style-fill>
      </ol-style>
    </ol-interaction-select>

    <ol-vector-layer
        background="#1a2b39"
        ref="vectorSourceRef"
        :opacity="opacity"

    >
      <ol-source-vector :features="geoJsonFeatures" :format="geoJson">
        <ol-style :overrideStyleFunction="styleFn"></ol-style>
      </ol-source-vector>
    </ol-vector-layer>

    <ol-interaction-dragbox
        :condition="shiftKeyOnly"
        @boxstart="log('boxstart', $event)"
        @boxdrag="log('boxdrag', $event)"
        @boxend="log('boxend', $event)"
        @boxcancel="log('boxcancel', $event)"
    ></ol-interaction-dragbox>
  </ol-map>
  </div>
</template>

<script setup lang="ts">
import type { Feature } from "ol";
import { Fill, Style } from "ol/style";
import { shiftKeyOnly } from "ol/events/condition";
import { ref, inject } from "vue";
import type { DragBoxEvent } from "ol/interaction/DragBox";
import features from '~/assets/data/geo/countries.geo.json';
import type {SelectEvent} from "ol/interaction/Select";

const opacity = ref(1);
const center = ref([0, 0]);
const projection = ref("EPSG:4326");
const zoom = ref(0);
const format = inject("ol-format");
const vectorSourceRef = ref(null)
const vectorMapRef = ref(null)
const geoJson = new format.GeoJSON();
const store = useCountriesStore();
let country = ref<string | number | undefined | null>(null);
const { selectedCountry } = storeToRefs(store);
const geoJsonFeatures = computed(() => {

  let geoFeatures = geoJson.readFeatures(features);
  geoFeatures.forEach(it => {
    it.set('color', getRandomColor())
  });
  return geoFeatures;
});


const getRandomColor = (): string => {
  return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
}
function styleFn(feature: Feature) {
  return new Style({
    fill: new Fill({
      color: (selectedCountry.value?.alpha3.toUpperCase() === feature.getId()? feature.get("color") : '#eeeeee')  || '#eeeeee',
    }),
  });
}
const featureSelected = (event: SelectEvent) => {
  if (event.selected.length) {
    country.value = event.selected[0].getId();
  }
};
const selectConditions = inject("ol-selectconditions");

const selectCondition = selectConditions.click;

const selectInteactionFilter = (feature) => {
  return feature.values_.name != undefined;
};

watch(selectedCountry, () => {
  if (vectorMapRef.value) {
    setTimeout(() => {
      center.value = [Math.random(), Math.random()];
    }, 200)
  }
})

</script>

<style lang="scss">
.map {
  max-width: 1200px;
  margin: auto;
}
</style>