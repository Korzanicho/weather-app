import axios from "axios";
import { defineStore } from "pinia";
import { useGeolocationStore } from "./geolocation";
import type { StoreDefinition } from "pinia";
import type {
  WeatherStoreActions,
  WeatherStore,
  ForecastResponse,
  ICity,
  RealtimeWeatherResponse,
} from "@/interfaces/interfaces";

export const useWeatherStore: StoreDefinition<
  "weather",
  WeatherStore,
  {},
  WeatherStoreActions
> = defineStore("weather", {
  state: () => ({
    isLoading: false as boolean,
    realtime: null as RealtimeWeatherResponse | null,
    forecast: null as ForecastResponse | null,
    cities: [] as Array<ICity>,
  }),

  actions: {
    async fetchCities(name: String): Promise<void> {
      const result = await axios.get(
        import.meta.env.VITE_API_URL + "/search.json",
        {
          params: {
            q: name as string,
          },
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
            "X-RapidAPI-Host": import.meta.env.VITE_API_HOST,
          },
        }
      );
      this.cities = result.data;
    },
    async fetchRealtimeWeather(localization: String = ""): Promise<void> {
      this.isLoading = true;
      try {
        if (localization === "") {
          const geolocationStore = useGeolocationStore();
          localization =
            geolocationStore.latitude && geolocationStore.longitude
              ? `${geolocationStore.latitude},${geolocationStore.longitude}`
              : "auto:ip";
        }

        const result = await axios.get(
          import.meta.env.VITE_API_URL + "/current.json",
          {
            params: {
              q: localization as string,
            },
            headers: {
              "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
              "X-RapidAPI-Host": import.meta.env.VITE_API_HOST,
            },
          }
        );
        this.realtime = result.data;
      } catch (error) {
        console.log(error);
      }

      this.isLoading = false;
    },
    async fetchForecastWeather(localization: String = ""): Promise<void> {
      this.isLoading = true;
      try {
        if (localization === "") {
          const geolocationStore = useGeolocationStore();
          localization =
            geolocationStore.latitude && geolocationStore.longitude
              ? `${geolocationStore.latitude},${geolocationStore.longitude}`
              : "auto:ip";
        }

        const result = await axios.get<ForecastResponse>(
          import.meta.env.VITE_API_URL + "/forecast.json",
          {
            params: {
              q: localization as string,
              days: 3 as number,
            },
            headers: {
              "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
              "X-RapidAPI-Host": import.meta.env.VITE_API_HOST,
            },
          }
        );
        this.forecast = result.data;
      } catch (error) {
        console.log(error, "error");
      }
      this.isLoading = false;
    },
  },
});
