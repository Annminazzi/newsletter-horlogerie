export interface Article {
  id: string;
  title: string;
  summary: string;
  imageURL: string;
  sourceURL: string;
  category: string;
  type: 'Vidéo' | 'Article';
  date: string;
}
