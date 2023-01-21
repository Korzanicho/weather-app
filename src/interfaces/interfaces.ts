type CurrentForecast = {
  cloud: number;
  condition: ForecastCondition;
  feelslike_c: number;
  feelslike_f: number;
  gust_kph: number;
  gust_mph: number;
  humidity: number;
  is_day: number;
  last_updated: string;
  last_updated_epoch: number;
  precip_in: number;
  precip_mm: number;
  pressure_in: number;
  pressure_mb: number;
  temp_c: number;
  temp_f: number;
  uv: number;
  vis_km: number;
  vis_miles: number;
  wind_degree: number;
  wind_dir: string;
  wind_kph: number;
  wind_mph: number;
};

type ForecastCondition = {
  code: number;
  icon: string;
  text: string;
};

type Forecast = {
  forecastday: ForecastDay[];
};

type ForecastDay = {
  astro: ForecastDayAstro;
  date: string;
  date_epoch: number;
  day: ForecastDayDay;
  hour: ForecastDayHour[];
};

type ForecastDayAstro = {
  moon_illumination: number;
  moon_phase: string;
  moonrise: string;
  moonset: string;
  sunrise: string;
  sunset: string;
};

export type ForecastDayHour = {
  chance_of_rain: string;
  chance_of_snow: string;
  cloud: number;
  condition: ForecastCondition;
  dewpoint_c: number;
  dewpoint_f: number;
  feelslike_c: number;
  feelslike_f: number;
  gust_kph: number;
  gust_mph: number;
  heatindex_c: number;
  heatindex_f: number;
  humidity: number;
  is_day: number;
  precip_in: number;
  precip_mm: number;
  pressure_in: number;
  pressure_mb: number;
  temp_c: number;
  temp_f: number;
  time: string;
  time_epoch: number;
  uv: number;
  vis_km: number;
  vis_miles: number;
  will_it_rain: number;
  will_it_snow: number;
  wind_degree: number;
  wind_dir: string;
  wind_kph: number;
  wind_mph: number;
  windchill_c: number;
  windchill_f: number;
};

type ForecastDayDay = {
  avghumidity: number;
  avgtemp_c: number;
  avgtemp_f: number;
  avgvis_km: number;
  avgvis_miles: number;
  condition: ForecastCondition;
  daily_chance_of_rain: string;
  daily_chance_of_snow: string;
  daily_will_it_rain: number;
  daily_will_it_snow: number;
  maxtemp_c: number;
  maxtemp_f: number;
  maxwind_kph: number;
  maxwind_mph: number;
  mintemp_c: number;
  mintemp_f: number;
  totalprecip_in: number;
  totalprecip_mm: number;
  totalsnow_cm: number;
  uv: number;
};

type ForecastLocation = {
  country: string;
  lat: number;
  localtime: string;
  localtime_epoch: number;
  lon: number;
  name: string;
  region: string;
  tz_id: string;
};

export type ForecastResponse = {
  current: CurrentForecast;
  forecast: Forecast;
  location: ForecastLocation;
};

export type RealtimeWeatherResponse = {
  current: CurrentForecast;
  location: ForecastLocation;
};

export type ICity = {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
};

export type WeatherStore = {
  isLoading: boolean;
  realtime: RealtimeWeatherResponse | null;
  forecast: ForecastResponse | null;
  cities: ICity[];
};

export type WeatherStoreActions = {
  fetchCities(name: String): Promise<void>;
  fetchRealtimeWeather(localization?: String): Promise<void>;
  fetchForecastWeather(localization?: String): Promise<void>;
};

export type IGeolocation = {
  isLoading: Boolean;
  latitude: Number;
  longitude: Number;
};

export type IGeolocationActions = {
  getLocalization(): Promise<void>;
  getCoordinates(): Promise<GeolocationPosition>;
};
