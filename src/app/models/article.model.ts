export class Article {
  id?: string;
  title: string;
  link: string;
  publication?: string;
  date: Date | string;
  constructor(data: IArticle) {
    this.id = data.id;
    this.title = data.title;
    this.link = data.link;
    this.publication = data.publication;
    this.date = data.date;
  }
}

export interface IArticle {
  id?: string;
  title: string;
  link: string;
  publication?: string;
  date: Date | string;
}
