"use client";

import Navbar from "@/components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import { Loading } from "@/components/Loading";
import { format, fromUnixTime, parseISO } from "date-fns";
import { Container } from "@/components/Container";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import { WeatherIcon } from "@/components/WheatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { WeatherDetails } from "@/components/WeatherDetails";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import { list } from "postcss";
import { ForecastWeatherDetails } from "@/components/ForecastWeatherDetails";
import { loadingCityAtom, placeAtom } from "./atom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { WeatherSkeleton } from "@/components/WheatherSkeleton";

interface WeatherDetail {
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
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
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
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default function Home() {
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity, setLoadingCity] = useAtom(loadingCityAtom);

  const { isLoading, error, data, refetch } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );

      return data;
    }
  );

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDateForEachdate = uniqueDates.map((date) =>
    data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    })
  );

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  if (isLoading) return <Loading />;

  const firstData = data?.list[0];

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar location={data?.city.name ?? ""} />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {loadingCity ? (
          <WeatherSkeleton />
        ) : (
          <>
            {/* today */}
            <section className="space-y-4">
              <div className="space-y-2">
                <h2 className="flex gap-1 text-2xl items-end">
                  <p>{format(firstData?.dt_txt ?? "", "EEEE")}</p>
                  <p className="text-lg">
                    ({format(firstData?.dt_txt ?? "", "dd-MM-yyyy")})
                  </p>
                </h2>
                <Container className="gap-10 px-6 items-center">
                  {/* temp */}
                  <div className="flex flex-col px-4">
                    <span className="text-5xl">
                      {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°
                    </span>
                    <p className="text-xs space-x-1 whitespace-nowrap">
                      <span>Feels like</span>
                      <span>
                        {convertKelvinToCelsius(
                          firstData?.main.feels_like ?? 0
                        )}
                        °
                      </span>
                    </p>
                    <p className="text-xs space-x-2">
                      <span>
                        {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}
                        °↓
                      </span>
                      <span>
                        {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}
                        °↑
                      </span>
                    </p>
                  </div>

                  {/* time and whwather icon */}
                  <div className="flex gap-10 sm:gap-16  overflow-x-auto w-full  justify-between pr-3">
                    {data?.list.map((d, i) => (
                      <div
                        key={d.pop + i}
                        className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                      >
                        <p className="whitespace-nowrap">
                          {format(d.dt_txt, "h:mm a")}
                        </p>
                        <WeatherIcon
                          iconName={getDayOrNightIcon(
                            d.weather[0].icon,
                            d.dt_txt
                          )}
                        />
                        <p className="">
                          {convertKelvinToCelsius(d?.main.temp ?? 0)}°
                        </p>
                      </div>
                    ))}
                  </div>
                </Container>
              </div>

              <div className="flex gap-4">
                <Container className="w-fit justify-center flex-col px-4 items-center">
                  <p className="capitalize text-center">
                    {firstData?.weather[0].description}
                  </p>
                  <WeatherIcon
                    iconName={getDayOrNightIcon(
                      firstData?.weather[0].icon ?? "",
                      firstData?.dt_txt ?? ""
                    )}
                  />
                </Container>

                <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
                  <WeatherDetails
                    visability={metersToKilometers(
                      firstData?.visibility ?? 10000
                    )}
                    airPresure={`${firstData?.main.pressure} hPa`}
                    humidity={`${firstData?.main.humidity} %`}
                    sunrise={format(
                      fromUnixTime(data?.city.sunrise ?? 1702949452),
                      "H:mm"
                    )}
                    sunset={format(
                      fromUnixTime(data?.city.sunset ?? 170294957),
                      "H:mm"
                    )}
                    windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
                  />
                </Container>
              </div>
            </section>

            <section className="flex w-full flex-col gap-4">
              <p className="text-2xl">Forcast (7 days)</p>
              {firstDateForEachdate.map((d, i) => (
                <ForecastWeatherDetails
                  key={`${d?.dt} ${i}`}
                  description={d?.weather[0].description ?? ""}
                  weatherIcon={d?.weather[0].icon ?? "01d"}
                  date={format(d?.dt_txt ?? "", "dd-MM")}
                  day={format(d?.dt_txt ?? "", "EEEE")}
                  feels_like={d?.main.feels_like ?? 0}
                  temp={d?.main.temp ?? 0}
                  temp_min={d?.main.temp_min ?? 0}
                  temp_max={d?.main.temp_max ?? 0}
                  visability={metersToKilometers(d?.visibility ?? 10000)}
                  airPresure={`${d?.main.pressure} hPa`}
                  humidity={`${d?.main.humidity} %`}
                  sunrise={format(
                    fromUnixTime(data?.city.sunrise ?? 1702949452),
                    "H:mm"
                  )}
                  sunset={format(
                    fromUnixTime(data?.city.sunset ?? 170294957),
                    "H:mm"
                  )}
                  windSpeed={convertWindSpeed(d?.wind.speed ?? 1.64)}
                />
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
