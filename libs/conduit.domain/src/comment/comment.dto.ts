import { Article } from '../article/article.dto';
import { User } from '../user/user.dto';

export class Comment {
  commentId!: string;
  createdAt!: Date;
  updatedAt!: Date;
  body!: string;
  author!: User;
  authorId!: string;
  article!: Article;
  articleId!: string | null;
}
