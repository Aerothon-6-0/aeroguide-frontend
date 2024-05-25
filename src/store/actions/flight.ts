import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURl = "https://aeroguide-backend.onrender.com/api/v1";

export const getFlightById = createAsyncThunk(
  "getFlightById",
  async (obj: any) => {
    const response = await axios.get(`${baseURl}/flight/${obj.flightId}/info`);
    return response;
  }
);
