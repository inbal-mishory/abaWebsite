export interface IBookReviewModel {
  title: string;
  link: string;
  paper?: string;
  writer?: string;
  id?: string;
}

export class BookReviewModel {
  title: string;
  link: string;
  paper?: string;
  writer?: string;
  id?: string;

  constructor(data: IBookReviewModel) {
    this.title = data.title;
    this.link = data.link;
    this.paper = data.paper;
    this.writer = data.writer;
    this.id = data.id;
  }
}
