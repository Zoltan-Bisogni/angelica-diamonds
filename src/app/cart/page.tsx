'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CartPage() {
  const {
    items: cartItems,
    getTotal,
    getItemCount,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    console.log('Iniziando il checkout con items:', cartItems);
    console.log('Numero totale di articoli diversi:', cartItems.length);
    console.log('Numero totale di pezzi:', getItemCount());
    setIsProcessing(true);

    try {
      console.log('Inviando richiesta all\'API...');
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          currency: 'eur',
        }),
      });

      console.log('Risposta ricevuta:', response.status);
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Errore response:', errorData);
        throw new Error(`Errore HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('Dati ricevuti:', data);
      const { sessionId, url } = data;

      if (url) {
        console.log('Reindirizzando a:', url);
        // Reindirizza direttamente all'URL di Stripe Checkout
        window.location.href = url;
      } else {
        console.log('Usando fallback con sessionId:', sessionId);
        // Fallback usando Stripe.js
        const stripe = await stripePromise;
        if (!stripe)
          throw new Error('Stripe non è stato caricato correttamente');

        const { error } = await stripe.redirectToCheckout({
          sessionId,
        });

        if (error) {
          console.error('Errore Stripe:', error);
          alert('Si è verificato un errore durante il pagamento. Riprova.');
        }
      }
    } catch (error) {
      console.error('Errore nel checkout:', error);
      const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto';
      alert(`Si è verificato un errore: ${errorMessage}. Riprova più tardi.`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className='bg-beige text-darkBrown min-h-screen'>
      {/* Header */}
      <header className='bg-white/90 border-b border-darkBrown/10 shadow-sm'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center space-x-4'>
              <Link
                href='/'
                className='text-darkBrown hover:text-pinkAccent transition-colors duration-300 flex items-center space-x-1'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 19l-7-7 7-7'
                  />
                </svg>
                <span className='font-medium'>Torna al negozio</span>
              </Link>
            </div>

            <div className='text-darkBrown/70'>
              {getItemCount()} {getItemCount() === 1 ? 'articolo' : 'articoli'}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto px-4 py-8 max-w-6xl'>
        {cartItems.length === 0 ? (
          // Carrello vuoto
          <div className='text-center py-16'>
            <div className='mb-8'>
              <div className='mx-auto w-32 h-32 bg-darkBrown/10 rounded-full flex items-center justify-center mb-4'>
                <svg
                  className='w-16 h-16 text-darkBrown/30'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-5M7 13l-1.5 3M17 13l1.5 3M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20.5 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z'
                  />
                </svg>
              </div>
              <h2 className='text-2xl font-semibold text-darkBrown mb-2'>
                Il tuo carrello è vuoto
              </h2>
              <p className='text-darkBrown/70 mb-8'>
                Sembra che non hai ancora aggiunto nessun articolo al carrello.
              </p>
              <Link
                href='/'
                className='bg-darkBrown text-beige px-6 py-3 rounded-lg hover:bg-darkBrown/90 transition-all duration-300 inline-block font-semibold tracking-wider'
              >
                Inizia a fare shopping
              </Link>
            </div>
          </div>
        ) : (
          // Carrello con prodotti
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Lista prodotti */}
            <div className='lg:col-span-2'>
              <div className='bg-white/80 rounded-lg shadow-sm'>
                <div className='p-6 border-b border-darkBrown/10'>
                  <h2 className='text-xl font-semibold text-darkBrown'>
                    Articoli nel carrello
                  </h2>
                </div>
                <div className='divide-y divide-darkBrown/10'>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className='p-6 hover:bg-darkBrown/5 transition-colors duration-200'
                    >
                      <div className='flex items-start space-x-4'>
                        {/* Immagine prodotto */}
                        <div className='flex-shrink-0'>
                          <div className='w-20 h-20 bg-darkBrown/10 rounded-lg overflow-hidden'>
                            <Image
                              src={item.imageUrl || '/logo.png'}
                              alt={item.name}
                              width={80}
                              height={80}
                              className='w-full h-full object-cover'
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/logo.png';
                              }}
                            />
                          </div>
                        </div>

                        {/* Dettagli prodotto */}
                        <div className='flex-1 min-w-0'>
                          <h3 className='text-lg font-medium text-darkBrown mb-1'>
                            {item.name}
                          </h3>
                          <p className='text-sm text-darkBrown/60 mb-2'>
                            {item.description || 'Gioiello di alta qualità'}
                          </p>
                          <p className='text-sm text-darkBrown/50'>
                            Categoria: {item.category}
                          </p>
                        </div>

                        {/* Prezzo e controlli */}
                        <div className='flex flex-col items-end space-y-2'>
                          <div className='text-right'>
                            <div className='text-lg font-semibold text-darkBrown'>
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            <div className='text-sm text-darkBrown/50'>
                              {formatPrice(item.price)} 
                            </div>
                          </div>

                          {/* Controlli quantità */}
                          <div className='flex items-center space-x-2'>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className='w-8 h-8 rounded-full bg-darkBrown/10 hover:bg-darkBrown/20 flex items-center justify-center transition-colors'
                              disabled={item.quantity <= 1}
                            >
                              <span className='text-darkBrown'>−</span>
                            </button>
                            <span className='w-8 text-center font-medium'>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className='w-8 h-8 rounded-full bg-darkBrown/10 hover:bg-darkBrown/20 flex items-center justify-center transition-colors'
                            >
                              <span className='text-darkBrown'>+</span>
                            </button>
                          </div>

                          {/* Rimuovi prodotto */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className='text-red-500 hover:text-red-700 text-sm transition-colors duration-200'
                          >
                            Rimuovi
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pulsante svuota carrello */}
              <div className='mt-6'>
                <button
                  onClick={clearCart}
                  className='text-red-600 hover:text-red-800 text-sm transition-colors duration-200'
                >
                  Svuota tutto il carrello
                </button>
              </div>
            </div>

            {/* Riepilogo ordine */}
            <div className='lg:col-span-1'>
              <div className='bg-white/80 rounded-lg shadow-sm sticky top-4'>
                <div className='p-6 border-b border-darkBrown/10'>
                  <h2 className='text-xl font-semibold text-darkBrown'>
                    Riepilogo ordine
                  </h2>
                </div>

                <div className='p-6 space-y-4'>
                  <div className='flex justify-between text-darkBrown/70'>
                    <span>
                      Subtotale ({getItemCount()}{' '}
                      {getItemCount() === 1 ? 'articolo' : 'articoli'})
                    </span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>

                  <div className='flex justify-between text-darkBrown/70'>
                    <span>Spedizione</span>
                    <span className='text-green-600'>Gratuita</span>
                  </div>

                  <div className='flex justify-between text-lg font-semibold text-darkBrown'>
                    <span>Totale</span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>

                  <div className='mt-6 space-y-3'>
                    <button
                      onClick={handleCheckout}
                      disabled={isProcessing || cartItems.length === 0}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                        isProcessing || cartItems.length === 0
                          ? 'bg-darkBrown/30 text-darkBrown/50 cursor-not-allowed'
                          : 'bg-darkBrown text-beige hover:bg-darkBrown/90'
                      }`}
                    >
                      {isProcessing ? 'Elaborazione...' : 'Procedi al checkout'}
                    </button>
                  </div>

                  {/* Info pagamento */}
                  <div className='p-6 bg-darkBrown/5 rounded-b-lg'>
                    <div className='text-center'>
                      <div className='text-pinkAccent font-semibold text-sm mb-1'>
                        💳 Pagamento sicuro con Stripe
                      </div>
                      <div className='text-darkBrown/60 text-xs'>
                        Carta di credito, debito e altri metodi
                      </div>
                    </div>

                    <div className='mt-4 space-y-2 text-sm text-darkBrown/70'>
                      <div className='flex items-center space-x-2'>
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                        <span>Garanzia a vita</span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                        <span>Spedizione gratuita</span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                        <span>Reso entro 30 giorni</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className='border-t border-darkBrown/20 py-12 bg-white/30'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='text-2xl font-bold tracking-wider mb-4 md:mb-0'>
              ANGELICA'S DIAMONDS
            </div>
            <div className='flex space-x-8 text-sm text-darkBrown/70'>
              <a href='#' className='hover:text-darkBrown transition-colors'>
                PRIVACY POLICY
              </a>
              <a href='#' className='hover:text-darkBrown transition-colors'>
                TERMS OF SERVICE
              </a>
              <a href='#' className='hover:text-darkBrown transition-colors'>
                CUSTOMER CARE
              </a>
            </div>
          </div>
          <div className='text-center mt-8 text-darkBrown/70 text-sm'>
            © 2024 Angelica's Diamonds. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
