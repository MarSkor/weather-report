import { useState, useEffect, useCallback, useRef } from "react";
import { baseUrl, apiKey, geoUrl } from "../lib/config";

export const useWeather = (defaultCity) => {
  const [weather, setWeather] = useState({ ready: false });
  const [city, setCity] = useState(defaultCity);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [unit, setUnit] = useState("metric");
  const [suggestions, setSuggestions] = useState([]);

  const activeCoords = useRef(null);

  const getSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      setIsError(null);
      return;
    }
    try {
      const res = await fetch(
        `${geoUrl}/direct?q=${query}&limit=5&appid=${apiKey}`,
      );

      if (!res.ok) {
        if (res.status === 429)
          throw new Error("Too many requests. Please wait.");
        if (res.status === 401) throw new Error("Invalid API Key.");
        throw new Error("Search service unavailable.");
      }
      const data = await res.json();

      console.log("suggestions", data);
      setSuggestions(data.length === 0 ? [{ noResults: true }] : data);
    } catch (error) {
      setSuggestions([{ isError: true, message: error.message }]);
    }
  };

  const getWeatherData = useCallback(
    async (lat, lon, cityName, country) => {
      activeCoords.current = { lat, lon, cityName, country };

      setIsLoading(true);
      setIsError(null);
      setSuggestions([]);

      try {
        const res = await fetch(
          `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`,
        );
        if (!res.ok) throw new Error("Failed to fetch weather");
        const data = await res.json();

        setWeather({
          ready: true,
          city: cityName,
          country: country,
          ...data.current,
          maxTemp: data.daily[0].temp.max,
          minTemp: data.daily[0].temp.min,
          description: data.current.weather[0].description,
          icon: data.current.weather[0].icon,
          alerts: data.alerts || [],
          hourly: data.hourly,
          daily: data.daily,
        });
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [unit],
  );

  const handleLocationClick = useCallback(() => {
    if (!navigator.geolocation) {
      setIsError("Geolocation is not supported by your browser.");
      return;
    }

    if (!weather.ready) setIsLoading(true);
    setIsError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `${geoUrl}/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`,
          );
          const data = await res.json();

          if (data && data.length > 0) {
            const { name, country } = data[0];
            setCity(`${name}, ${country}`);
            getWeatherData(latitude, longitude, name, country);
          } else {
            getWeatherData(latitude, longitude, "Current Location", "");
          }
        } catch (error) {
          setIsError("Failed to identify your location.");
          setIsLoading(false);
        }
      },
      (error) => {
        setIsLoading(false);
        if (error.code === 1) {
          setIsError("Location access denied. Please search manually.");
        } else {
          setIsError("Location Unavailable.");
        }
      },
    );
  }, [weather.ready, getWeatherData]);

  useEffect(() => {
    if (activeCoords.current) {
      const { lat, lon, cityName, country } = activeCoords.current;
      getWeatherData(lat, lon, cityName, country);
      return;
    }
    const fetchInitial = async () => {
      try {
        const res = await fetch(
          `${geoUrl}/direct?q=${defaultCity}&limit=1&appid=${apiKey}`,
        );
        const data = await res.json();
        if (data?.[0]) {
          getWeatherData(
            data[0].lat,
            data[0].lon,
            data[0].name,
            data[0].country,
          );
        }
      } catch (error) {
        setIsError("Could not find default city.");
      }
    };
    fetchInitial();
  }, [unit, getWeatherData, defaultCity]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (city.length >= 3) {
        getSuggestions(city);
      } else {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [city]);

  return {
    weather,
    city,
    setCity,
    isError,
    isLoading,
    unit,
    setUnit,
    suggestions,
    getWeatherData,
    handleLocationClick,
  };
};
