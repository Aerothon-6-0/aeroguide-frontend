import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { flightSlice } from "./reducers/flightReducer";

const rootReducer = combineReducers({
  flight: flightSlice.reducer,
});

export const makeStore = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof makeStore.getState>;
export type AppDispatch = typeof makeStore.dispatch;
