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
  error?: string | null;
  isLoading: boolean;
  loggedIn: boolean;
}

export interface IResponseBook {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks: {
      thumbnail?: string;
    };
    publishedDate?: string;
    description?: string;
  };
}

export interface IBook {
  id: string;
  title: string;
  authors: string[];
  imageLink?: string;
  usersId?: (string | undefined)[];
}
