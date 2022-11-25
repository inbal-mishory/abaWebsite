export interface IBook {
  id?:string | undefined;
  cover: string;
  publication_year: string;
  publisher: string;
  title: string;
  article?: string;
  article2?: string;
  link?: string;
}

export class Book {
  id?: string;
  cover: string;
  publication_year: string;
  publisher: string;
  title: string;
  article?: string;
  article2?: string;
  link?: string;

  constructor(data:IBook) {
    this.id = data.id;
    this.cover = data.cover;
    this.publication_year = data.publication_year;
    this.publisher = data.publisher;
    this.title = data.title;
    this.article = data.article;
    this.article2 = data.article2;
    this.link = data.link;
  }

}
