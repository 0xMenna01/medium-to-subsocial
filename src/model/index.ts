export interface Profile {
  address: string;
  name: string;
  mediumUsername: string;
}

export interface MediumArticle {
  author: string;
  id: string;
  urL: string;
  image_url: string;
  published_at: string;
  title: string;
  subtitle: string;
  tags: string[];
  content: any;
}

export interface RequestOptions {
  method: string;
  url: string;
  headers: any;
}
