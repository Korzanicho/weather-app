import { defineStore } from "pinia";
import type { StoreDefinition } from "pinia";
import type {
  IGeolocation,
  IGeolocationActions,
} from "@/interfaces/interfaces";

export const useGeolocationStore: StoreDefinition<
  "geolocation",
  IGeolocation,
  {},
  IGeolocationActions
> = defineStore("geolocation", {
  state: () => ({
    isLoading: false as Boolean,
    latitude: 0 as Number,
    longitude: 0 as Number,
  }),

  actions: {
    async getLocalization(): Promise<void> {
      this.isLoading = true;

      if ("geolocation" in navigator) {
        try {
          const position = await this.getCoordinates();
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        } catch (error) {
          console.log("Geolocation denied.");
        }
      } else {
        console.log("Geolocation is not supported by this browser.");
      }

      this.isLoading = false;
    },
    getCoordinates(): Promise<GeolocationPosition> {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },
  },
});
