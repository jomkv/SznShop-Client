import apiSlice from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: () => ({
        url: "/auth/login",
        method: "GET",
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
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

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useLogoutMutation,
  useLoginMutation,
} = authApiSlice;
