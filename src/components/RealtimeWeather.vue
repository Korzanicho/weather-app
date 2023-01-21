<script setup lang="ts">
import TheLoader from "@/components/common/TheLoader.vue";
import { useWeatherStore } from "@/stores/weather";

import type { Store } from "pinia";
import type {
  WeatherStore,
  WeatherStoreActions,
} from "@/interfaces/interfaces";

const weatherStore: Store<"weather", WeatherStore, {}, WeatherStoreActions> =
  useWeatherStore();

if (!weatherStore.realtime) weatherStore.fetchRealtimeWeather();
if (!weatherStore.forecast) weatherStore.fetchForecastWeather();

weatherStore.fetchForecastWeather();
</script>

<template>
  <div class="RealtimeWeather">
    <TheLoader v-if="weatherStore.isLoading" />
    <div v-else>
      <span class="RealtimeWeather__city">
        {{ weatherStore?.forecast?.location.name }}
      </span>
      <br />
      <span class="RealtimeWeather__temperature">
        {{ weatherStore?.forecast?.current.temp_c }}°
      </span>
      <span class="RealtimeWeather__condition">
        {{ weatherStore?.forecast?.current.condition.text }}
        <img
          class="RealtimeWeather__condition-icon"
          :src="weatherStore?.forecast?.current.condition.icon"
          alt="weather icon"
        />
      </span>
      <div>
        <span class="RealtimeWeather__hight">
          H:{{ weatherStore?.forecast?.forecast.forecastday[0].day.maxtemp_c }}°
        </span>
        <span class="RealtimeWeather__low">
          L:{{ weatherStore?.forecast?.forecast.forecastday[0].day.mintemp_c }}°
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.RealtimeWeather
  padding-top: 1.5rem
  text-align: center
  &__city
    font-size: 2.2rem

  &__temperature
    font-size: 6rem

  &__condition
    display: block
    font-size: 1.3rem
    padding-bottom: 1rem

  &__condition-icon
    max-width: 1.5rem

  &__hight, &__low
    font-size: 1.3rem
    margin: 0 0.5rem
</style>
