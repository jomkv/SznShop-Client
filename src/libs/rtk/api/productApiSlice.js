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
    }),
    getProduct: builder.query({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.product,
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
    editProduct: builder.mutation({
      query: (data) => ({
        url: `/product/${data.productId}`,
        method: "PUT",
        body: data.formData,
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
    getStocks: builder.query({
      query: (productId) => ({
        url: `/product/${productId}/stocks`,
        method: "GET",
      }),
      transformResponse: (response) => response.stocks,
    }),
    editStocks: builder.mutation({
      query: (data) => ({
        url: `/product/${data.productId}/stocks`,
        method: "PUT",
        body: data,
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
  useGetProductQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useEditStocksMutation,
} = productApiSlice;
