import apiSlice from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      transformResponse: (response) => response.user,
      keepUnusedDataFor: 60 * 60 * 24 * 15, // 15 days
      providesTags: ["Auth"],
    }),
  }),
});

export const { useGetMeQuery, useLazyGetMeQuery } = authApiSlice;
