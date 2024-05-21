import { makeStore } from "@/store/store";
import React from "react";
import { Provider } from "react-redux";

function ReduxProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={makeStore}>{children}</Provider>
}


export default ReduxProvider
