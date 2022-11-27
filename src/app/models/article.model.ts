export class Article {
  id?: string;
  title: string;
  link: string;
  publication?: string;
  paper?: string;
  date: Date | string;
  constructor(data: IArticle) {
    this.id = data.id;
    this.title = data.title;
    this.link = data.link;
    this.publication = data.publication;
    this.paper = data.paper;
    this.date = data.date;
  }
}

export interface IArticle {
  id?: string;
  title: string;
  link: string;
  publication?: string;
  paper?: string;
  date: Date | string;
}

export interface IChildArticle {
  id?: string;
  title: string;
  link: string;
  magazine?: string;
  year: string;
}
