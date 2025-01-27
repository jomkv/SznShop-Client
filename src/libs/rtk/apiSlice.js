import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../constants/index";

const baseQuery = fetchBaseQuery({ baseUrl: API_URL, credentials: "include" });

const apiSlice = createApi({
  baseQuery,
  tagTypes: [
    "Product",
    "User",
    "Auth",
    "Category",
    "Cart",
    "Address",
    "Order",
    "Rating",
    "Admin",
    "Search",
  ],
  endpoints: (builder) => ({}),
});

export default apiSlice;
