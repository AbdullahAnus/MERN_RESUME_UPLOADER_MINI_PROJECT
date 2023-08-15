import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { CandidateProfileAPI } from "../services/candidateProfileAPI";

export const store = configureStore({
  reducer: {
    [CandidateProfileAPI.reducerPath]: CandidateProfileAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CandidateProfileAPI.middleware),
});

setupListeners(store.dispatch);
