import type { Photo } from '../types/photography';

export const photos: Photo[] = [
  {
    id: 1,
    title: 'Golden Hour',
    category: 'Portrait',
    image: '/images/portfolio/portfolio-1.avif',
    alt: 'Portrait photographed in warm evening light',
  },
  {
    id: 2,
    title: 'A Quiet Moment',
    category: 'Portrait',
    image: '/images/portfolio/portfolio-2.avif',
    alt: 'Individual portrait outdoors',
  },
  {
    id: 3,
    title: 'The Celebration',
    category: 'Event',
    image: '/images/portfolio/event-1.avif',
    alt: 'Guests celebrating at an event',
  },
  {
    id: 4,
    title: 'Together',
    category: 'Event',
    image: '/images/portfolio/event-2.webp',
    alt: 'Group photographed during a celebration',
  },
  {
    id: 5,
    title: 'Everyday Stories',
    category: 'Lifestyle',
    image: '/images/portfolio/lifestyle-1.avif',
    alt: 'Candid lifestyle photograph',
  },
  {
    id: 6,
    title: 'Afternoon Light',
    category: 'Lifestyle',
    image: '/images/portfolio/lifestyle-2.avif',
    alt: 'Lifestyle photograph in natural light',
  },
];