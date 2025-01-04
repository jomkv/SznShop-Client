import apiSlice from "../apiSlice";

export const ratingApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Rating"],
  endpoints: (builder) => ({
    createRating: builder.mutation({
      query: () => ({
        url: "/rating",
        method: "POST",
      }),
      invalidatesTags: ["Rating"],
    }),
  }),
});

export const { useCreateRatingMutation } = ratingApiSlice;
