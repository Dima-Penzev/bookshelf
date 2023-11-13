export interface IFormUserValues {
  email: string;
  password: string;
  id?: string;
  loggedIn?: boolean;
}

export interface IResponseBook {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    publishedDate: string;
    imageLinks: {
      thumbnail: string | undefined;
    };
    previewLink: string;
  };
}
