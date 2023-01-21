<script setup lang="ts">
import moment from "moment";
import { useWeatherStore } from "@/stores/weather";
import type { Store } from "pinia";
import type {
  WeatherStore,
  WeatherStoreActions,
} from "@/interfaces/interfaces";

const weatherStore: Store<"weather", WeatherStore, {}, WeatherStoreActions> =
  useWeatherStore();

defineProps<{
  weather: any;
}>();
</script>

<template>
  <div
    :class="
      moment().hour() === moment(weather.time).hour()
        ? `HourlyWeather HourlyWeather--now`
        : `HourlyWeather`
    "
    v-if="!weatherStore.isLoading"
  >
    <span class="HourlyWeather__element HourlyWeather__element--temp">
      {{
        moment().hour() === moment(weather.time).hour()
          ? "Now"
          : moment(weather.time).format("h a")
      }}
      <br />
    </span>
    <img
      class="HourlyWeather__element HourlyWeather__element--icon"
      :src="weather.condition.icon"
      alt="weather icon"
    />
    <span class="HourlyWeather__element HourlyWeather__element--temp">
      {{ weather.temp_c }}°
    </span>
  </div>
</template>

<style lang="sass" scoped>
.HourlyWeather
  background: rgba(72, 49, 157, 0.2)
  border: 1px solid rgba(255, 255, 255, 0.2)
  box-shadow: 5px 4px 10px rgba(0, 0, 0, 0.25), inset 1px 1px 0px #FFFFFF
  border-radius: 30px
  padding: 1.8rem .5rem
  margin: 0 1.5rem
  min-width: 80px
  text-align: center
  text-transform: uppercase

  &--now
    background: #48319D

  &__element
    font-size: 1.2rem
    font-weight: 600
    justify-content: center
    color: #FFFFFF
</style>
