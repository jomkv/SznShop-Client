import apiSlice from "../apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ productId, quantity, size }) => ({
        url: `/cart/${productId}`,
        method: "POST",
        body: {
          quantity,
          size,
        },
      }),
      invalidatesTags: ["Cart"],
    }),
    getCart: builder.query({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
      providesTags: ["Cart"],
      tagTypes: ["Cart"],
      transformResponse: (response) => response.cartProducts,
    }),
    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: `/cart/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    incrementQuantity: builder.mutation({
      query: (productId) => ({
        url: `/cart/${productId}/increment`,
        method: "POST",
      }),
      invalidatesTags: ["Cart"],
    }),
    decrementQuantity: builder.mutation({
      query: (productId) => ({
        url: `/cart/${productId}/decrement`,
        method: "POST",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useGetCartLazyQuery,
  useRemoveFromCartMutation,
  useIncrementQuantityMutation,
  useDecrementQuantityMutation,
} = cartApiSlice;
