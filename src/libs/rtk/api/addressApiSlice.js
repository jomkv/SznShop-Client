import apiSlice from "../apiSlice";

export const addressApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    createAddress: builder.mutation({
      query: (formData) => ({
        url: `/address`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Address"],
    }),
    getAddresses: builder.query({
      query: () => ({
        url: "/address",
        method: "GET",
      }),
      providesTags: ["Address"],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/address/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),
    editAddress: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/address/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useEditAddressMutation,
  useDeleteAddressMutation,
} = addressApiSlice;
