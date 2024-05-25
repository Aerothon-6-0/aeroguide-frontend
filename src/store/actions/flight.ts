import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURl = " https://b2e7-103-92-103-55.ngrok-free.app/api/v2";

export const getFlightById = createAsyncThunk("getFlightById", async (obj: any) => {
	const response = await axios.get(`${baseURl}/flight/${obj.flightId}/info`);
	return response;
});
