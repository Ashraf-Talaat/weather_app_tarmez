import { configureStore } from "@reduxjs/toolkit";
import weatherApiSliceReducer from "../features/weatherApi/weatherApiSlice";

export const store = configureStore({
  reducer: {
    weatherApi: weatherApiSliceReducer,
  },
});
