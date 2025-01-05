import apiSlice from "../apiSlice";

export const ratingApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Rating"],
  endpoints: (builder) => ({
    createRating: builder.mutation({
      query: ({ orderId, ratings }) => ({
        url: `/rating/${orderId}`,
        method: "POST",
        body: {
          ratings,
        },
      }),
      invalidatesTags: ["Rating", "Order"],
    }),
  }),
});

export const { useCreateRatingMutation } = ratingApiSlice;
