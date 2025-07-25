'use client';

import Image from 'next/image';
import { useState } from 'react';
import { mockBags } from '../data/bagsData';
import { Bag, Product } from '../types';
import { useCartStore } from '../store/cartStore';
import { ShoppingCartIcon, CheckIcon } from '@heroicons/react/24/outline';

interface BagsSectionProps {
  className?: string;
}

export default function BagsSection({ className = '' }: BagsSectionProps) {
  const [selectedBag, setSelectedBag] = useState<Bag | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const { addItem, toggleCart } = useCartStore();

  const handleBagClick = (bag: Bag) => {
    setSelectedBag(bag);
    setSelectedColor(bag.colors[0]);
    setCurrentImageIndex(0);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const nextImage = () => {
    if (selectedBag && selectedBag.images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === selectedBag.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedBag && selectedBag.images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedBag.images.length - 1 : prev - 1
      );
    }
  };

  // Funzione per convertire una Bag in Product per il carrello
  const convertBagToProduct = (bag: Bag, color: string): Product => {
    return {
      id: `${bag.id}-${color}`, // ID unico per borsa + colore
      name: `${bag.name} - ${color}`,
      description: bag.description,
      price: bag.price,
      imageUrl: bag.images[0],
      category: bag.category,
      inStock: bag.inStock,
      slug: bag.name.toLowerCase().replace(/\s+/g, '-'),
      color: color,
    };
  };

  const addToCart = async () => {
    if (selectedBag && selectedColor && !isAddingToCart) {
      setIsAddingToCart(true);

      try {
        // Converti la borsa in prodotto per il carrello
        const product = convertBagToProduct(selectedBag, selectedColor);

        // Aggiungi al carrello
        addItem(product);

        // Mostra feedback visivo
        setJustAdded(true);

        // Aspetta un momento per mostrare il feedback
        setTimeout(() => {
          setJustAdded(false);
          setIsAddingToCart(false);

          // Chiudi il modal dopo un breve delay
          setTimeout(() => {
            setSelectedBag(null);
            // Opzionalmente apri il carrello
            // toggleCart();
          }, 800);
        }, 1200);
      } catch (error) {
        console.error("Errore nell'aggiunta al carrello:", error);
        setIsAddingToCart(false);
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <section id='bags' className={`py-20 ${className}`}>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold tracking-wider text-darkBrown mb-4'>
            LE NOSTRE BORSE
          </h2>
          <p className='text-lg text-darkBrown/80 max-w-2xl mx-auto'>
            Scopri la nostra collezione di borse esclusive, realizzate con
            materiali pregiati e un&apos;attenzione particolare ai dettagli
          </p>
        </div>

        {/* Bags Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
          {mockBags.map((bag) => (
            <div
              key={bag.id}
              className='group cursor-pointer'
              onClick={() => handleBagClick(bag)}
            >
              <div className='relative aspect-square overflow-hidden rounded-lg bg-white/50 backdrop-blur-sm border border-darkBrown/10'>
                <Image
                  src={bag.thumbnail || bag.images[0]}
                  alt={bag.name}
                  placeholder='blur'
                  blurDataURL={bag.blurDataURL}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='object-cover group-hover:scale-105 transition-transform duration-300'
                />
                {bag.featured && (
                  <div className='absolute top-4 font-bold left-4 bg-pinkAccent text-white px-3 py-1 rounded-full text-sm'>
                    In Evidenza
                  </div>
                )}
                {!bag.inStock && (
                  <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                    <span className='text-white font-bold text-lg'>
                      Esaurito
                    </span>
                  </div>
                )}
              </div>
              <div className='mt-4'>
                <h3 className='font-bold text-darkBrown group-hover:text-pinkAccent transition-colors'>
                  {bag.name}
                </h3>
                <p className='text-darkBrown/70 text-sm mt-1'>{bag.category}</p>
                <p className='font-bold text-darkBrown mt-2'>
                  {formatPrice(bag.price)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bag Detail Modal */}
        {selectedBag && (
          <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <div className='bg-beige rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
              <div className='p-6'>
                {/* Close Button */}
                <button
                  onClick={() => setSelectedBag(null)}
                  className='float-right text-white hover:scale-120 transition-all text-2xl'
                >
                  ×
                </button>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8'>
                  {/* Image Gallery */}
                  <div className='space-y-4'>
                    <div className='relative aspect-square bg-white/50 rounded-lg overflow-hidden'>
                      <Image
                        src={selectedBag.images[currentImageIndex]}
                        alt={selectedBag.name}
                        fill
                        priority={currentImageIndex === 0}
                        sizes='(max-width: 768px) 100vw, 50vw'
                        className='object-cover'
                      />
                      {selectedBag.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-darkBrown p-2 rounded-full transition-colors'
                          >
                            ←
                          </button>
                        </>
                      )}
                    </div>

                    {/* Thumbnail Gallery */}
                    {selectedBag.images.length > 1 && (
                      <div className='flex space-x-2'>
                        {selectedBag.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                              currentImageIndex === index
                                ? 'border-pinkAccent'
                                : 'border-transparent'
                            }`}
                          >
                            <Image
                              src={image}
                              alt={`${selectedBag.name} ${index + 1}`}
                              fill
                              className='object-cover'
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className='space-y-6'>
                    <div>
                      <h2 className='text-3xl font-bold text-white mb-2'>
                        {selectedBag.name}
                      </h2>
                      <p className='text-2xl font-bold text-white'>
                        {formatPrice(selectedBag.price)}
                      </p>
                    </div>

                    <p className='text-white leading-relaxed'>
                      {selectedBag.description}
                    </p>

                    {/* Product Info */}
                    <div className='grid grid-cols-2 gap-4 text-sm'>
                      <div>
                        <span className='font-medium text-white'>
                          Categoria:
                        </span>
                        <p className='text-white'>{selectedBag.category}</p>
                      </div>
                      <div>
                        <span className='font-medium text-white'>
                          Materiale:
                        </span>
                        <p className='text-white'>{selectedBag.material}</p>
                      </div>
                      <div>
                        <span className='font-medium text-white'>
                          Dimensioni:
                        </span>
                        <p className='text-white'>{selectedBag.dimensions}</p>
                      </div>
                      <div>
                        <span className='font-medium text-white'>
                          Disponibilità:
                        </span>
                        <p
                          className={
                            selectedBag.inStock
                              ? 'text-green-600'
                              : 'text-red-600'
                          }
                        >
                          {selectedBag.inStock ? 'Disponibile' : 'Esaurito'}
                        </p>
                      </div>
                    </div>

                    {/* Color Selection */}
                    <div>
                      <h3 className='font-medium text-white mb-3'>Colore:</h3>
                      <div className='flex flex-wrap gap-3'>
                        {selectedBag.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorSelect(color)}
                            className={`px-4 py-2 rounded-full border-2 transition-colors ${
                              selectedColor === color
                                ? 'border-pinkAccent bg-pinkAccent text-white'
                                : 'border-darkBrown/20 text-darkBrown hover:border-pinkAccent'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={addToCart}
                      disabled={!selectedBag.inStock || isAddingToCart}
                      className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-colors duration-200 flex items-center justify-center space-x-2 ${
                        !selectedBag.inStock
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                          : justAdded
                          ? 'bg-green-500 text-white'
                          : isAddingToCart
                          ? 'bg-pinkAccent text-white'
                          : 'bg-pinkAccent hover:bg-pinkAccent/90 text-white'
                      }`}
                    >
                      {!selectedBag.inStock ? (
                        <span>NON DISPONIBILE</span>
                      ) : justAdded ? (
                        <>
                          <CheckIcon className='w-6 h-6' />
                          <span>AGGIUNTO AL CARRELLO!</span>
                        </>
                      ) : isAddingToCart ? (
                        <>
                          <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                          <span>AGGIUNGENDO...</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCartIcon className='w-6 h-6' />
                          <span>AGGIUNGI AL CARRELLO</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
