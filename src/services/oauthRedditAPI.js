import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const oauthRedditApi = createApi({
    reducerPath: "oauthRedditApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://oauth.reddit.com/",
        prepareHeaders: (headers) => {
            const accessToken = localStorage.getItem("accessToken");
            headers.set('authorization', `Bearer ${accessToken}`)
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getPopular: builder.query({ query: () => ""})
    })
});

export const {
    useGetPopularQuery
} = oauthRedditApi;