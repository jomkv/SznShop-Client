import apiSlice from "../apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      transformResponse: (response) => response.categories,
    }),
    getCategoryProducts: builder.query({
      query: (categoryId) => ({
        url: `/category/${categoryId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetCategoryProductsQuery } =
  categoryApiSlice;
