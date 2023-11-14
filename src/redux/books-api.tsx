import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponseBook } from "../types/types";

interface IResponse {
  items: IResponseBook[];
}

export const booksApi = createApi({
  reducerPath: "books",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/books/v1/",
  }),
  endpoints: (build) => ({
    getBooks: build.query({
      query: (bookQuery) =>
        `volumes?projection=lite&maxResults=20&q=${
          bookQuery ? bookQuery : "%22%22"
        }`,
      transformResponse: ({ items }: IResponse) =>
        items.map((book) => ({
          id: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          imageLink: book.volumeInfo.imageLinks?.thumbnail,
        })),
    }),
  }),
});

export const { useGetBooksQuery } = booksApi;
