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
    getMyOrders: builder.query({
      query: () => ({
        url: "/order",
        method: "GET",
      }),
      providesTags: ["Order"],
      tagTypes: ["Order"],
    }),
    receiveOrder: builder.mutation({
      query: (orderId) => ({
        url: `/order/${orderId}/received`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),
    getOrder: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.order,
      tagTypes: ["Order"],
    }),
    completeOrder: builder.mutation({
      query: (orderId) => ({
        url: `/order/${orderId}/complete`,
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
  useGetMyOrdersQuery,
  useReceiveOrderMutation,
  useGetOrderQuery,
  useCompleteOrderMutation,
} = orderApiSlice;
