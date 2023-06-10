import { createContext, useReducer } from "react";
import "@/styles/globals.css";

const storeContext = createContext();

const ACTION_TYPE = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_LAT_LONG:
      return {
        ...state,
        latLong: action.payload.latLong,
      };
    case ACTION_TYPE.SET_COFFEE_STORES:
      return {
        ...state,
        coffeeStores: action.payload.coffeeStores,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: "",
    coffeeStores: [],
  };
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <storeContext.Provider value={{ state, dispatch }}>
      {children}
    </storeContext.Provider>
  );
};

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />;
    </StoreProvider>
  );
}
