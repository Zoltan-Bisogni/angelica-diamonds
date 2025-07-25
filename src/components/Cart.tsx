'use client';

import { useCartStore } from '@/store/cartStore';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotal } =
    useCartStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black bg-opacity-50 z-40'
        onClick={toggleCart}
      />

      {/* Cart Panel */}
      <div className='fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out'>
        <div className='flex flex-col h-full'>
          {/* Header */}
          <div className='flex items-center justify-between p-4 border-b'>
            <h2 className='text-lg font-semibold'>Carrello</h2>
            <button
              onClick={toggleCart}
              className='p-2 hover:bg-gray-100 rounded-full transition-colors'
            >
              <X className='h-5 w-5' />
            </button>
          </div>

          {/* Cart Items */}
          <div className='flex-1 overflow-y-auto p-4'>
            {items.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-full text-center'>
                <ShoppingBag className='h-16 w-16 text-gray-300 mb-4' />
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  Il tuo carrello è vuoto
                </h3>
                <p className='text-gray-500 mb-6'>
                  Aggiungi alcuni prodotti per iniziare lo shopping
                </p>
                <Link
                  href='/prodotti'
                  onClick={toggleCart}
                  className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
                >
                  Vai ai prodotti
                </Link>
              </div>
            ) : (
              <div className='space-y-4'>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center space-x-4 bg-gray-50 p-3 rounded-lg'
                  >
                    <div className='relative h-16 w-16 flex-shrink-0'>
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className='object-cover rounded-md'
                        onError={(e) => {
                          // Fallback per immagini mancanti
                          e.currentTarget.src = '/placeholder-product.jpg';
                        }}
                      />
                    </div>

                    <div className='flex-1 min-w-0'>
                      <h3 className='text-sm font-medium text-gray-900 line-clamp-2'>
                        {item.name}
                      </h3>
                      <p className='text-sm text-gray-500'>
                        €{item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className='flex items-center space-x-2'>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className='p-1 hover:bg-gray-200 rounded transition-colors'
                      >
                        <Minus className='h-4 w-4' />
                      </button>
                      <span className='text-sm font-medium w-8 text-center'>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className='p-1 hover:bg-gray-200 rounded transition-colors'
                      >
                        <Plus className='h-4 w-4' />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className='p-1 text-red-500 hover:bg-red-50 rounded transition-colors'
                    >
                      <X className='h-4 w-4' />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Total and Checkout */}
          {items.length > 0 && (
            <div className='border-t p-4 space-y-4'>
              <div className='flex justify-between items-center text-lg font-semibold'>
                <span>Totale:</span>
                <span>€{getTotal().toFixed(2)}</span>
              </div>

              <div className='space-y-2'>
                <Link
                  href='/checkout'
                  onClick={toggleCart}
                  className='checkout-button'
                >
                  Procedi al Checkout
                </Link>
                <Link
                  href='/carrello'
                  onClick={toggleCart}
                  className='w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center block font-medium'
                >
                  Visualizza Carrello
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
