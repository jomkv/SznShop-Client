import apiSlice from "../apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProductsAdmin: builder.query({
      query: (filter) => ({
        url: `/product/all?${filter}`,
        method: "GET",
      }),
      providesTags: (result, error, filter) => [
        { type: "Product", id: filter },
      ],
    }),
    getProductsHome: builder.query({
      query: () => ({
        url: "/product/home",
        method: "GET",
      }),
      transformResponse: (response) => response.products,
      invalidatesTags: [{ type: "Product" }],
    }),
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/product",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: [{ type: "Product" }],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Product" }],
    }),
  }),
});

export const {
  useGetProductsAdminQuery,
  useLazyGetProductsAdminQuery,
  useGetProductsHomeQuery,
  useLazyGetProductsHomeQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
