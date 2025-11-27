import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeatherApi = createAsyncThunk(
  "weatherApi/fetchWeather",
  async () => {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=3a26c7ed075ea96552764086756f4f9d"
    );

    //temp
    const responseTemp = Math.round(response.data.main.temp - 272.15);

    //min temp
    const min = Math.round(response.data.main.temp_min - 272.15);

    //max temp
    const max = Math.round(response.data.main.temp_max - 272.15);

    //Description temp
    const description = response.data.weather[0].description;

    //icon
    const responseIcon = response.data.weather[0].icon;

    return {
      number: responseTemp,
      description,
      min,
      max,
      icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
    };
  }
);

export const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: {
    result: "empty",
    weatherData: {},
    isLoading: false,
  },
  reducers: {
    test: (state) => {
      state.result = "change result";
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchWeatherApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWeatherApi.fulfilled, (state, actoin) => {
        state.isLoading = false;
        state.weatherData = actoin.payload;
      })
      .addCase(fetchWeatherApi.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { test } = weatherApiSlice.actions;

export default weatherApiSlice.reducer;
