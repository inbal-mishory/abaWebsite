export class Critique {
  id?: string | undefined;
  title: string;
  artist?: string;
  curator?: string;
  museum?: string;
  paper?: string;
  date: Date | string;
  article?: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.artist = data.artist;
    this.curator = data.curator;
    this.paper = data.paper;
    this.museum = data.museum;
    this.date = data.date;
    this.article = data.article;
  }
}

export interface ICritique {
  title: string;
  id: string;
  artist?: string;
  curator?: string;
  paper?: string;
  museum?: string;
  date: Date | string;
  article?: string;
}
