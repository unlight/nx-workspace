import { Article } from '../article/article.dto';

export class Tag {
  tagId!: string;
  name!: string;
  articles!: Array<Article>;
}
