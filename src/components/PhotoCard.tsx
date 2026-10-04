import type { Photo } from '../types/photography';

type PhotoCardProps = {
  photo: Photo;
  onOpen: (photo: Photo) => void;
};

export function PhotoCard({ photo, onOpen }: PhotoCardProps) {
  return (
    <button
      type="button"
      className="photo-card"
      onClick={() => onOpen(photo)}
      aria-label={`View ${photo.title} photograph`}
    >
      <img
        src={photo.image}
        alt={photo.alt}
        loading="lazy"
      />

      <span className="photo-details">
        <span>{photo.category}</span>
        <strong>{photo.title}</strong>
      </span>
    </button>
  );
}