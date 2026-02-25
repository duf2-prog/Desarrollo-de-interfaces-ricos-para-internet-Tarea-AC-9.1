import { configureStore, type Middleware } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import menuReducer from "./slices/menuSlice";
import logger from "../services/logging";

const loggingMiddleware: Middleware = (_storeAPI) => (next) => (action: any) => {
  logger.debug(`Redux action: ${action.type}`);
  return next(action);
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    menu: menuReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(loggingMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
