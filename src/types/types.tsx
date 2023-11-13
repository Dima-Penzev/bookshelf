export interface IFormUserValues {
  email: string;
  password: string;
  id?: string;
  loggedIn?: boolean;
}

export interface ILoggedInUser {
  user: IFormUserValues | null | undefined;
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
  };
}
