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
  }),
});

export const { useGetDashboardQuery } = adminApiSlice;
