export interface IBook {
  id?:string | undefined;
  cover: string;
  publication_year: string;
  publisher: string;
  title: string;
  article?: string;
  link?: string;
}

export class Book {
  id?: string;
  cover: string;
  publication_year: string;
  publisher: string;
  title: string;
  article?: string;
  link?: string;

  constructor(data:IBook) {
    this.id = data.id;
    this.cover = data.cover;
    this.publication_year = data.publication_year;
    this.publisher = data.publisher;
    this.title = data.title;
    this.article = data.article;
    this.link = data.link;
  }

}
