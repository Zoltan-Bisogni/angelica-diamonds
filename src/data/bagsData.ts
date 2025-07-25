import { Bag } from '../types';

export const mockBags: Bag[] = [
  {
    id: '1',
    name: 'Angelica Sparkle',
    description: 'Una splendida borsa in pelle nera perfetta per occasioni eleganti e serate speciali. Realizzata con pelle di alta qualità e finiture di lusso.',
    price: 34.99,
    images: [
      '/optimized/sparkle.jpg',
    ],
    thumbnail: '/thumbnails/sparkle.jpg',
    blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMUlEQVR4nGM4sG1vXHJMQlgsQ5JvsJyysq6iBkNafAQbI0NuUhjD/z9ffj899v/jOQAaVBDc/zK2VgAAAABJRU5ErkJggg==',
    colors: ['Nero', 'Marrone Scuro', 'Bordeaux'],
    category: 'Elegante',
    material: 'Pelle Italiana',
    dimensions: '30x25x12 cm',
    inStock: true,
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  

  {
    id: '2',
    name: 'Angelica Velvet Dream',
    description: 'Borsa sportiva dal design giovane e dinamico. Ideale per la palestra, weekend fuori porta e attività all\'aperto.',
    price: 39.99,
    images: [
      '/optimized/velvet-dream.jpg',
    ],
    thumbnail: '/thumbnails/velvet-dream.jpg',
    blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAM0lEQVR4nAEoANf/AKqgqkI7Pv/5/wBbSV0qJSsZARMAQjAyoJJ8fmRXALSpnLCmlP/98EIBEalFd6gyAAAAAElFTkSuQmCC',
    colors: ['Rosa', 'Fucsia', 'Rosa Antico'],
    category: 'Elegante',
    material: 'Tessuto Tecnico',
    dimensions: '40x30x20 cm',
    inStock: true,
    featured: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
    {
    id: '3',
    name: 'Angelica Classic Velvet',
    description: 'Borsa versatile per l\'uso quotidiano, spaziosa e comoda. Perfetta per il lavoro e il tempo libero con un design moderno e funzionale.',
    price: 32.99,
    images: [
      '/optimized/classic-velvet.jpg',
    ],
    thumbnail: '/thumbnails/classic-velvet.jpg',
    blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAACE4AAAhOAFFljFgAAAAP0lEQVR4nAE0AMv/AMG+tKmjmHR5gYKcvQC4qq9rZl8UEgwDAAYAiGhhmYFslnpgNBgMAP/33//o0uvbxPTq1nTZGkjzdRBhAAAAAElFTkSuQmCC',
    colors: ['Beige', 'Cammello', 'Crema'],
    category: 'Casual',
    material: 'Pelle Sintetica',
    dimensions: '35x28x15 cm',
    inStock: true,
    featured: false,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
      {
    id: '4',
    name: 'Angelica Coral Bloom',
    description: 'Borsa versatile per l\'uso quotidiano, spaziosa e comoda. Perfetta per il mare con un look estivo e un design moderno e funzionale.',
    price: 29.99,
    images: [
      '/coral-bloom.png',
    ],
    thumbnail: '/coral-bloom.png',
    blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAAAXNSR0IArs4c6QAAAIRlWElmTU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAADYAAAAAQAAANgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAOgAwAEAAAAAQAAAAQAAAAAqMfnrgAAAAlwSFlzAAAhOAAAITgBRZYxYAAAAs1pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+MjE2PC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj4yMTY8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj45MjI8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjE8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjEyMTA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KmqjZ1AAAADFJREFUCB1jNFYQkVTRZPz1nUVQVFr1zacvXCwsgly8ti8//dXTY5ZWkmNUV2e0sQQA4ucKy58LEfMAAAAASUVORK5CYII=',
    colors: ['Coral', 'Rosa Chiaro', 'Salmone'],
    category: 'Estiva',
    material: 'Tessuto Leggero',
    dimensions: '32x26x14 cm',
    inStock: true,
    featured: false,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  }
];
