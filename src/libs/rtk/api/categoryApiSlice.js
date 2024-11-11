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
      providesTags: [{ type: "Category" }],
    }),
    getCategoryProducts: builder.query({
      query: (categoryId) => ({
        url: `/category/${categoryId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.productIds,
      providesTags: (result, error, categoryId) => [
        { type: "Category", id: categoryId },
      ],
    }),
    editCategoryProducts: builder.mutation({
      query: ({ categoryId, productIds }) => ({
        url: `/category/${categoryId}`,
        method: "PUT",
        body: { productIds },
      }),
      invalidatesTags: [{ type: "Category" }],
    }),
    createCategory: builder.mutation({
      query: (formData) => ({
        url: "/category",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Category" }],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryProductsQuery,
  useEditCategoryProductsMutation,
  useCreateCategoryMutation,
} = categoryApiSlice;
