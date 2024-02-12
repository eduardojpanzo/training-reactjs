import React from "react";
import { FiDroplet } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { MdAir } from "react-icons/md";

export interface WeatherDetailsProps {
  visability: string;
  humidity: string;
  windSpeed: string;
  airPresure: string;
  sunrise: string;
  sunset: string;
}

export function WeatherDetails(props: WeatherDetailsProps) {
  const {
    visability = "25km",
    humidity = "61%",
    windSpeed = "7 km/h",
    airPresure = "1012 hPa",
    sunrise = "6.20",
    sunset = "18:48",
  } = props;

  return (
    <>
      <SingleWeatherDetail
        icon={<LuEye />}
        information="Visability"
        value={visability}
      />

      <SingleWeatherDetail
        icon={<FiDroplet />}
        information="Humidity"
        value={humidity}
      />

      <SingleWeatherDetail
        icon={<MdAir />}
        information="WindSpeed"
        value={windSpeed}
      />

      <SingleWeatherDetail
        icon={<ImMeter />}
        information="AirPresure"
        value={airPresure}
      />

      <SingleWeatherDetail
        icon={<LuSunrise />}
        information="Sunrise"
        value={sunrise}
      />

      <SingleWeatherDetail
        icon={<LuSunset />}
        information="sunset"
        value={props.sunset}
      />
    </>
  );
}

export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
      <p className="whitespace-nowrap"> {props.information}</p>
      <div className="text-3xl">{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
}
