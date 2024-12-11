import apiSlice from "../apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: ({ addressId, products, isCart }) => ({
        url: "/order",
        method: "POST",
        body: {
          address: addressId,
          products,
          isCart,
        },
      }),
      invalidatesTags: ["Order", "Cart"],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/order/all",
        method: "GET",
      }),
      providesTags: ["Order"],
      tagTypes: ["Order"],
      transformResponse: (res) => res.orders,
    }),
    acceptOrder: builder.mutation({
      query: (orderId) => ({
        url: `/order/${orderId}/accept`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),
    rejectOrder: builder.mutation({
      query: (orderId) => ({
        url: `/order/${orderId}/reject`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useAcceptOrderMutation,
  useRejectOrderMutation,
} = orderApiSlice;
