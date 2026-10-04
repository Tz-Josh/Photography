export type PhotoCategory =
  | 'Portrait'
  | 'Event'
  | 'Lifestyle';

export type Photo = {
  id: number;
  title: string;
  category: PhotoCategory;
  image: string;
  alt: string;
};