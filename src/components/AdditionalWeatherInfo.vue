<script setup lang="ts">
import TheBox from "@/components/common/TheBox.vue";
import { ref } from "vue";
import { useWeatherStore } from "@/stores/weather";
import type { Ref } from "vue";
import type { Store } from "pinia";
import type {
  WeatherStore,
  WeatherStoreActions,
} from "@/interfaces/interfaces";

const weatherStore: Store<"weather", WeatherStore, {}, WeatherStoreActions> =
  useWeatherStore();

if (!weatherStore.forecast) weatherStore.fetchForecastWeather();

const isCollapsed: Ref<boolean> = ref(false);

function collapseAdditionalInfo(): void {
  isCollapsed.value = !isCollapsed.value;
  const additionalInfoELement: Element = document.getElementsByClassName(
    "AdditionalWeatherInfo"
  )[0];
  additionalInfoELement.classList.toggle("AdditionalWeatherInfo--collapsed");
}
</script>

<template>
  <div class="AdditionalWeatherInfo" v-if="weatherStore.forecast">
    <TheBox class="info-box">
      <template #header>Sunrise</template>
      <span class="info-box__value" :style="{ fontSize: '1.7rem' }">
        {{ weatherStore?.forecast?.forecast.forecastday[0].astro.sunrise }}
      </span>
    </TheBox>
    <TheBox class="info-box">
      <template #header>Sunset</template>
      <span class="info-box__value" :style="{ fontSize: '1.7rem' }">
        {{ weatherStore?.forecast?.forecast.forecastday[0].astro.sunset }}
      </span>
    </TheBox>
    <TheBox class="info-box">
      <template #header>chance of rain</template>
      <span class="info-box__value" :style="{ fontSize: '2rem' }">
        {{
          weatherStore?.forecast?.forecast.forecastday[0].day
            .daily_chance_of_rain
        }}%
      </span>
    </TheBox>
    <TheBox class="info-box">
      <template #header>Avg. temperature</template>
      <span class="info-box__value" :style="{ fontSize: '2.5rem' }">
        {{ weatherStore.forecast.forecast.forecastday[0].day.avgtemp_c }}°
      </span>
    </TheBox>
  </div>
  <div
    class="AdditionalWeatherInfo"
    v-if="isCollapsed && weatherStore.forecast"
  >
    <TheBox class="info-box">
      <template #header>Total precip.</template>
      <span class="info-box__value" :style="{ fontSize: '2.5rem' }">
        {{ weatherStore.forecast.forecast.forecastday[0].day.totalprecip_mm
        }}<span :style="{ fontSize: '1rem' }">mm</span>
      </span>
    </TheBox>
    <TheBox class="info-box">
      <template #header>Avg. humidity</template>
      <span class="info-box__value" :style="{ fontSize: '2.5rem' }">
        {{ weatherStore.forecast.forecast.forecastday[0].day.avghumidity }}%
      </span>
    </TheBox>
    <TheBox class="info-box">
      <template #header>Moonrise</template>
      <span class="info-box__value" :style="{ fontSize: '1.7rem' }">
        {{ weatherStore.forecast.forecast.forecastday[0].astro.moonrise }}
      </span>
    </TheBox>
    <TheBox class="info-box">
      <template #header>Moonset</template>
      <span class="info-box__value" :style="{ fontSize: '1.7rem' }">
        {{ weatherStore.forecast.forecast.forecastday[0].astro.moonset }}
      </span>
    </TheBox>
    <TheBox class="info-box">
      <template #header>Max wind</template>
      <span class="info-box__value" :style="{ fontSize: '2rem' }">
        {{ weatherStore.forecast.forecast.forecastday[0].day.maxwind_kph }}
        <span :style="{ fontSize: '1rem' }">km/h</span>
      </span>
    </TheBox>
    <TheBox class="info-box">
      <template #header>UV index</template>
      <span class="info-box__value" :style="{ fontSize: '2.5rem' }">
        {{ weatherStore.forecast.forecast.forecastday[0].day.uv }}
      </span>
    </TheBox>
  </div>
  <div class="collapse-button">
    <span @click="collapseAdditionalInfo">
      {{ isCollapsed ? "see less" : "see more" }}
    </span>
  </div>
</template>

<style lang="sass">
.AdditionalWeatherInfo
  display: flex
  justify-content: space-between
  padding: 0 1rem
  flex-wrap: wrap

  &--collapsed
    max-height: 23rem
    overflow-y: hidden

.info-box
  margin: .5rem 0
  flex-basis: 45%
  height: 10rem

.collapse-button
  flex-basis: 100%
  text-align: center
  margin-bottom: 1rem
  span
    cursor: pointer
</style>
