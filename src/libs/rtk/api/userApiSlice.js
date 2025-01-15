import apiSlice from "../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `/user`,
        method: "GET",
      }),
      tagTypes: ["User"],
      providesTags: ["User"],
      transformResponse: (response) => response.users,
    }),
    banUser: builder.mutation({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useBanUserMutation } = userApiSlice;
