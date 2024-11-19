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
    }),
  }),
});

export const { useAddToCartMutation, useGetCartQuery, useGetCartLazyQuery } =
  cartApiSlice;
