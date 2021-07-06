export class UserCreateInput {
  email!: string;
  name!: string;
  password!: string;
  bio?: string;
  image?: string;
}
