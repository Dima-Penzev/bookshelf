import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
  reducerPath: "books",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/books/v1/",
  }),
  endpoints: (build) => ({
    getBooks: build.query({
      query: (bookQuery) =>
        bookQuery
          ? `volumes?projection=lite&maxResults=20&q=${bookQuery}`
          : `volumes?projection=lite&maxResults=20&q=""`,
    }),
  }),
});

export const { useGetBooksQuery } = booksApi;
