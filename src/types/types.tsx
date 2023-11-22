export interface IRequest {
  bookName: string;
  id?: string;
}

export interface IFormUserValues {
  email?: string;
  password?: string;
  id?: string;
  searchHistory?: IRequest[];
  favoriteBooks?: string[];
}

export interface ILoggedInUser {
  user: IFormUserValues | null;
  error: string | null | undefined;
  isLoading: boolean;
  loggedIn: boolean;
}

export interface IResponseBook {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks: {
      thumbnail: string | undefined;
    };
    publishedDate?: string;
    description?: string;
  };
}

export interface IBook {
  id: string;
  title: string;
  authors: string[];
  cover: string | undefined;
  usersId?: (string | undefined)[];
}
