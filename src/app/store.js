import { configureStore } from "@reduxjs/toolkit";
import { oauthRedditApi } from "../services/oauthRedditApi";
import { redditApi } from "../services/redditAPI";

export const store = configureStore({
    reducer: {
        [redditApi.reducerPath]: redditApi.reducer,
        [oauthRedditApi.reducerPath]: oauthRedditApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(redditApi.middleware)
            .concat(oauthRedditApi.middleware)
})