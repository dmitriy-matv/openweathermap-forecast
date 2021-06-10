export interface IForecastResponse {
  cod: number;
  message: number;
  cnt: number;

  list: IForecastListElement[];
  city: {
    id: number;
    name: string;
    coord: {
      lon: number;
      lat: number;
    };
    country: string;
    population: number;
    timezone: number;
  };
}

export interface IForecastListElement {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain: {};
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface IGroupedForecast {
  [key: string]: IForecastListElement[];
}
