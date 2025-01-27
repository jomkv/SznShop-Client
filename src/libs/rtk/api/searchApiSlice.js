import apiSlice from "../apiSlice";

export const searchApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Search"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: `/search/categories`,
        method: "GET",
      }),
      providesTags: ["Search", "Category"],
      tagTypes: ["Search", "Category"],
      transformResponse: (response) => response.categories,
    }),
    getSearchResults: builder.query({
      query: (filters) => {
        let url = "/search?";
        const { search, category, size, rating, minPrice, maxPrice, inStock } =
          filters;

        if (search) {
          url += `search=${search}&`;
        }

        if (category) {
          url += `category=${category}&`;
        }

        if (size) {
          url += `size=${size}&`;
        }

        if (rating) {
          url += `ratings=${rating}&`;
        }

        if (minPrice && maxPrice) {
          url += `price=${minPrice + "-" + maxPrice}&`;
        }

        if (inStock) {
          url += `inStock=${inStock}&`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Rating"],
      tagTypes: ["Rating"],
      transformResponse: (response) => response.products,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetSearchResultsQuery,
  useLazyGetSearchResultsQuery,
} = searchApiSlice;
