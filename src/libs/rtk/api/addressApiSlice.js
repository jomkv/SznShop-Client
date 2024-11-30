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
    getAddress: builder.query({
      query: (id) => ({
        url: `/address/${id}`,
        method: "GET",
      }),
      providesTags: ["Address"],
      transformResponse: (response) => response.address,
    }),
    getAddresses: builder.query({
      query: () => ({
        url: "/address",
        method: "GET",
      }),
      providesTags: ["Address"],
      transformResponse: (response) => response.addresses,
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
    setDefault: builder.mutation({
      query: (id) => ({
        url: `/address/${id}/set-default`,
        method: "PUT",
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useGetAddressQuery,
  useCreateAddressMutation,
  useEditAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultMutation,
} = addressApiSlice;
