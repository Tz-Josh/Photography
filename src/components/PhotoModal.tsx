import { useEffect, useRef } from 'react';
import type { Photo } from '../types/photography';

type PhotoModalProps = {
  photo: Photo;
  onClose: () => void;
};

export function PhotoModal({
  photo,
  onClose,
}: PhotoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="photo-modal"
        role="dialog"
        aria-modal="true"
        aria-label={photo.title}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close photograph"
        >
          ×
        </button>

        <img src={photo.image} alt={photo.alt} />

        <div className="modal-caption">
          <span>{photo.category}</span>
          <h3>{photo.title}</h3>
        </div>
      </div>
    </div>
  );
}