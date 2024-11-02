import apiSlice from "../apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/product",
        method: "POST",
        body: formData,
        formData: true,
      }),
    }),
  }),
});

export const { useCreateProductMutation } = productApiSlice;
