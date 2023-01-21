<script setup lang="ts">
import { ref, computed } from "vue";
import { onMounted, onBeforeUnmount } from "vue";
import { useWeatherStore } from "@/stores/weather";
import type { Ref } from "vue";
import type { Store } from "pinia";
import type {
  ICity,
  WeatherStore,
  WeatherStoreActions,
} from "@/interfaces/interfaces";

const emit = defineEmits<{
  (e: "change"): void;
}>();

const weatherStore: Store<"weather", WeatherStore, {}, WeatherStoreActions> =
  useWeatherStore();
const location: Ref<String> = ref("");

const submit = (): void => {
  weatherStore.fetchRealtimeWeather(location.value);
  weatherStore.fetchForecastWeather(location.value);

  emit("change");
};

const cities = computed<ICity[]>(() => weatherStore.cities);

let first: HTMLElement | null = null;
let last: HTMLElement | null = null;

onMounted(() => {
  first = document.getElementById("city");
  last = document.getElementsByClassName(
    "LocalizationForm__close"
  )[0] as HTMLElement;
  last.addEventListener("keydown", keydownEventHandler);
});

onBeforeUnmount(() => {
  last?.removeEventListener("keydown", keydownEventHandler);
});

const keydownEventHandler = (e: KeyboardEvent) => {
  if (e.key === "Tab") {
    e.preventDefault();
    first?.focus();
  }
};

const getCities = (): void => {
  if (location.value.length > 3) {
    weatherStore.fetchCities(location.value);
  }
};
</script>

<template>
  <div class="LocalizationForm">
    <button
      class="LocalizationForm__close"
      @click="emit('change')"
      tabindex="4"
    >
      X
    </button>
    <form class="LocalizationForm__form">
      <div :style="{ flexBasis: '75%' }">
        <div class="LocalizationForm__input">
          <label for="city" class="readers-only">City</label>
          <input
            type="text"
            id="city"
            v-model="location"
            tabindex="1"
            @input="getCities"
          />
        </div>
        <ul class="LocalizationForm__list">
          <li
            v-for="city in cities"
            :key="city.name"
            class="LocalizationForm__list-item"
            @click="location = city.name"
            tabindex="2"
          >
            {{ city.name }}{{ city.region ? `, ${city.region}` : ""
            }}{{ city.country ? `, ${city.country}` : "" }}
          </li>
        </ul>
      </div>
      <div class="LocalizationForm__input">
        <button type="submit" @click.prevent="submit" tabindex="3">
          Choose
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="sass" scoped>
.LocalizationForm
  top: 0
  left: 0
  z-index: 2
  width: 100%
  height: 100%
  display: flex
  position: absolute
  align-items: center
  justify-content: center
  background-color: #2e3358ee
  &__list
    list-style: none
    padding: 0
    margin: 0
    &-item
      cursor: pointer
      padding: 0.5rem
      &:hover
        background-color: #2e3358
  &__form
    width: 80%
    display: flex
    justify-content: space-between
  &__close
    position: absolute
    top: 1rem
    right: 1rem
    font-size: 2rem
    color: #fff
    background-color: transparent
    border: none
    cursor: pointer
  &__input
    display: flex
    margin-bottom: 1rem
    flex-direction: column
    label
      margin-bottom: 0.5rem
    input
      color: #fff
      padding: 0.5rem
      border: 1px solid #ccc
      border-radius: 4px
      outline: none
      background-color: #26273fd1
      &:focus
        border-color: #333
    button
      padding: 0.5rem
      background: rgba(72, 49, 157, 0.2)
      border: 1px solid rgba(255, 255, 255, 0.2)
      box-shadow: 5px 4px 10px rgba(0, 0, 0, 0.25), inset 1px 1px 0px #FFFFFF
      border-radius: 15px
      outline: none
      cursor: pointer
      color: #fff
      text-transform: uppercase
      font-size: .7rem
      &:hover
        background-color: #ccc
      &:focus
        border-color: #333
</style>
