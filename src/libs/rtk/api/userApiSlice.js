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
    getUsernamesAndNames: builder.query({
      query: () => ({
        url: "/user/username-name",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["User"],
      tagTypes: ["User"],
    }),
    editProfile: builder.mutation({
      query: (formData) => ({
        url: "/user",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: [{ type: "User", id: "ME" }],
    }),
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      transformResponse: (response) => response.user,
      keepUnusedDataFor: 0,
      providesTags: [{ type: "User", id: "ME" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useBanUserMutation,
  useGetUsernamesAndNamesQuery,
  useEditProfileMutation,
  useGetMeQuery,
} = userApiSlice;
