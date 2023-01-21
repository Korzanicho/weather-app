<script setup lang="ts">
import { ref } from "vue";
import moment from "moment";
import LocalizationForm from "@/components/LocalizationForm.vue";
import HourlyWeather from "./components/HourlyWeather.vue";
import RealtimeWeather from "./components/RealtimeWeather.vue";
import AdditionalWeatherInfo from "./components/AdditionalWeatherInfo.vue";
import TheLoader from "./components/common/TheLoader.vue";
import { onUpdated } from "vue";
import { useWeatherStore } from "@/stores/weather";
import { useGeolocationStore } from "@/stores/geolocation";

import type { Ref } from "vue";
import type { Store } from "pinia";
import type {
  WeatherStore,
  WeatherStoreActions,
  IGeolocation,
  IGeolocationActions,
  ForecastDayHour,
} from "@/interfaces/interfaces";

const geolocationStore: Store<
  "geolocation",
  IGeolocation,
  {},
  IGeolocationActions
> = useGeolocationStore();

const weatherStore: Store<"weather", WeatherStore, {}, WeatherStoreActions> =
  useWeatherStore();

geolocationStore.getLocalization();

const isFormVisible: Ref<boolean> = ref(false);

if (!weatherStore.forecast) weatherStore.fetchForecastWeather();

onUpdated(() => {
  setHourlyWeatherPosition();
});

const setHourlyWeatherPosition = (): void => {
  const hourlyElement: Element = document.getElementsByClassName("hourly")[0];

  if (!hourlyElement || !weatherStore.forecast) return;

  weatherStore.forecast.forecast.forecastday[0].hour.forEach(
    (weather: ForecastDayHour, index: number) => {
      if (moment(weather.time).hour() === moment().hour()) {
        const child: HTMLElement = hourlyElement.children[0] as HTMLElement;
        if (!child) return;
        const width: number = child.offsetWidth;
        hourlyElement.scrollLeft = (width + width / 2 + width / 10) * index;
      }
    }
  );
};
</script>

<template>
  <header></header>
  <main v-if="!geolocationStore.isLoading">
    <LocalizationForm v-if="isFormVisible" @change="isFormVisible = false" />
    <RealtimeWeather />
    <div class="hourly">
      <HourlyWeather
        v-for="(weather, index) in weatherStore?.forecast?.forecast
          .forecastday[0].hour"
        :key="weather.time_epoch + index"
        :weather="weather"
      />
    </div>
    <AdditionalWeatherInfo />
    <button class="search-city" @click="isFormVisible = true">
      <img src="@/assets/localization.svg" alt="search city" />
    </button>
  </main>
  <TheLoader v-else />
</template>

<style lang="sass">
main
  margin: 0 auto
  overflow-x: hidden

.hourly
  display: flex
  align-items: center
  margin-top: 3rem
  margin-bottom: 1.5rem
  width: 100vw
  overflow-x: scroll
  -ms-overflow-style: none
  scrollbar-width: none

.hourly::-webkit-scrollbar
  display: none

.additional-info
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

.search-city
  position: absolute
  top: 1rem
  right: 1rem
  background-color: transparent
  border: none
  cursor: pointer
  font-size: 1.5rem
  color: #FFF
</style>
