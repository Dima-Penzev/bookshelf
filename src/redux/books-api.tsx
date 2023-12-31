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
      query: (bookQuery) => ({
        url: `volumes?q=${bookQuery ? bookQuery : "%22%22"}`,
        params: {
          projection: "lite",
          maxResults: "20",
        },
      }),
      transformResponse: ({ items }: IResponse) =>
        items.map((book) => ({
          id: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          imageLink: book.volumeInfo.imageLinks?.thumbnail,
        })),
    }),
    getBooksDetails: build.query({
      query: (bookId) => `volumes/${bookId}`,
      transformResponse: (book: IResponseBook) => ({
        id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        imageLink: book.volumeInfo.imageLinks?.thumbnail,
        publishedDate: book.volumeInfo.publishedDate,
        description: book.volumeInfo.description,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useGetBooksDetailsQuery } = booksApi;
