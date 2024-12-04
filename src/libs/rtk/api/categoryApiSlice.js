import apiSlice from "../apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: (includeCategories) => {
        const url =
          includeCategories === true
            ? "/category?includeProducts=true"
            : "/category";

        return {
          url: url,
          method: "GET",
        };
      },
      transformResponse: (response) => response.categories,
      providesTags: [{ type: "Category" }],
    }),
    getCategoriesHome: builder.query({
      query: () => ({
        url: "/category/home",
        method: "GET",
      }),
      transformResponse: (response) => response.categoryWithProducts,
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
      query: ({ categoryId, name, productIds }) => ({
        url: `/category/${categoryId}`,
        method: "PUT",
        body: { name, productIds },
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
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/category/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Category" }],
    }),
    toggleShowCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/category/show/${categoryId}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Category" }],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryProductsQuery,
  useGetCategoriesHomeQuery,
  useEditCategoryProductsMutation,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useToggleShowCategoryMutation,
} = categoryApiSlice;
