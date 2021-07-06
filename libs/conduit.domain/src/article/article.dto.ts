import { Comment } from '../comment/comment.dto';
import { Tag } from '../tag/tag.dto';
import { User } from '../user/user.dto';

export class Article {
  articleId!: string;
  slug!: string;
  title!: string;
  description!: string;
  body!: string;
  tags!: Array<Tag>;
  createdAt!: Date;
  updatedAt!: Date;
  favoritesCount!: number;
  author!: User;
  authorId!: string | null;
  favoritedBy!: Array<User>;
  comments!: Array<Comment>;
}
