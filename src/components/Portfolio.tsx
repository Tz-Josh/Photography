import { useState } from 'react';
import { photos } from '../data/photos';
import type {
  Photo,
  PhotoCategory,
} from '../types/photography';
import { PhotoCard } from './PhotoCard';
import { PhotoModal } from './PhotoModal';

type Filter = 'All' | PhotoCategory;

const filters: Filter[] = [
  'All',
  'Portrait',
  'Event',
  'Lifestyle',
];

export function Portfolio() {
  const [selectedFilter, setSelectedFilter] =
    useState<Filter>('All');

  const [selectedPhoto, setSelectedPhoto] =
    useState<Photo | null>(null);

  const visiblePhotos =
    selectedFilter === 'All'
      ? photos
      : photos.filter(
          (photo) => photo.category === selectedFilter
        );

  return (
    <section
      className="portfolio-section"
      id="portfolio"
      aria-labelledby="portfolio-title"
    >
      <div className="section-intro">
        <p className="eyebrow">Selected work</p>

        <h2 id="portfolio-title">
          Moments worth remembering.
        </h2>

        <p>
          Explore a collection of portraits, events,
          and everyday stories.
        </p>
      </div>

      <div
        className="portfolio-filters"
        role="group"
        aria-label="Filter photographs"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={
              selectedFilter === filter ? 'active' : ''
            }
            aria-pressed={selectedFilter === filter}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="photo-grid">
        {visiblePhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onOpen={setSelectedPhoto}
          />
        ))}
      </div>

      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </section>
  );
}