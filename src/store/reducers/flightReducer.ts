import { createSlice } from "@reduxjs/toolkit";
import { getFlightById } from "../actions/flight";

const initialState = {
	flightData: null,
	loader: false,
};

export const flightSlice = createSlice({
	name: "Flight",
	initialState,
	reducers: {
		setFlightData: (state, action) => {
			state.flightData = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(getFlightById.fulfilled, (state, { payload }) => {
			state.flightData = payload.data;
			state.loader = false;
		});
		builder.addCase(getFlightById.pending, (state, { payload }) => {
			state.flightData = null;
			state.loader = true;
		});
	},
});
export const { setFlightData } = flightSlice.actions;
