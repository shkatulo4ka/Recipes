import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../app/services/auth";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: async (actiion, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (actiion.payload.token) {
      localStorage.setItem("token", actiion.payload.token);
    }
  },
});
