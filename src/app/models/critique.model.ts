export class Critique {
  // id?: string | undefined;
  title: string;
  imgUrl?: string;
  artist?: string;
  museum: string;
  date: any;
  article?: string;

  constructor(data: ICritique) {
    this.title = data.title
    this.artist = data.artist
    this.museum = data.museum
    this.date = data.date
    this.article = data.article
  }
}

export interface ICritique {
  title: string;
  imgUrl?: string;
  artist?: string;
  museum: string;
  date: any;
  article?: string;
}
