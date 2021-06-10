import React from "react";
import { IForecastResponse } from "../types/forecastTypes";
import { IWeatherResponse } from "../types/weatherTypes";

interface IApiFetcher {
  getWeather: (id: number) => Promise<IWeatherResponse>;
  getForecast: (id: number) => void;
}

export class ApiFetcher implements IApiFetcher {
  private WEATHER_URL =
    "http://api.openweathermap.org/data/2.5/weather?units=metric&";
  private FORECAST_URL =
    "http://api.openweathermap.org/data/2.5/forecast?units=metric&";
  private APP_ID = "appid=538882fc8387290c6cee83f313a6acf5";

  public async getWeather(id: number): Promise<IWeatherResponse> {
    const url = this.WEATHER_URL + this.APP_ID + `&id=${id.toString()}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}. Received ${res.status}.`);
    }

    return await res.json();
  }
  public async getForecast(id: number): Promise<IForecastResponse> {
    const url = this.FORECAST_URL + this.APP_ID + `&id=${id.toString()}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}. Received ${res.status}.`);
    }

    return await res.json();
  }
}
