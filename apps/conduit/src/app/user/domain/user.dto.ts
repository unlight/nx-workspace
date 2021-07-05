export interface User {
  userId: string;
  email: string;
  name: string;
  password: string;
  bio?: string;
  image?: string;
  following?: Array<User>;
  followers?: Array<User>;
  favoriteArticles?: Array<Article>;
}
