import apiSlice from "../apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Admin"],
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),
    }),
    getOverview: builder.query({
      query: () => ({
        url: "/admin/overview",
        method: "GET",
      }),
    }),
    getHomeImages: builder.query({
      query: () => ({
        url: "/admin/home-images",
        method: "GET",
      }),
      transformResponse: (response) => response.homeImages,
      providesTags: ["Admin"],
      tagTypes: ["Admin"],
    }),
    setHomeImages: builder.mutation({
      query: (formData) => ({
        url: "/admin/home-images",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetHomeImagesQuery,
  useSetHomeImagesMutation,
  useGetOverviewQuery,
} = adminApiSlice;
