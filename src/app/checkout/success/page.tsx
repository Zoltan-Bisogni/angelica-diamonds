'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    // Svuota il carrello dopo un acquisto riuscito
    clearCart();
  }, [clearCart]);

  return (
    <div className="bg-beige text-darkBrown min-h-screen">
      {/* Header */}
      <header className="bg-white/90 border-b border-darkBrown/10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="text-2xl font-bold tracking-wider text-darkBrown">
                ANGELICA'S DIAMONDS
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-8">
            <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-wider mb-6 text-darkBrown">
            PAGAMENTO COMPLETATO!
          </h1>
          
          <p className="text-xl text-darkBrown/80 mb-8 max-w-2xl mx-auto">
            Grazie per il tuo acquisto! Il tuo ordine è stato processato con successo.
          </p>

          {/* Order Details */}
          <div className="bg-white/80 rounded-lg p-8 mb-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-darkBrown">Cosa succede ora?</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-green-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-darkBrown">Conferma via email</h3>
                  <p className="text-darkBrown/70">Riceverai una conferma d'ordine nella tua casella email entro pochi minuti.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-green-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-darkBrown">Preparazione dell'ordine</h3>
                  <p className="text-darkBrown/70">I tuoi gioielli verranno preparati con cura dal nostro team di esperti.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-green-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-darkBrown">Spedizione gratuita</h3>
                  <p className="text-darkBrown/70">Il tuo ordine verrà spedito gratuitamente entro 2-3 giorni lavorativi.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              href="/"
              className="inline-block bg-darkBrown text-beige px-8 py-3 rounded-lg font-semibold tracking-wider hover:bg-darkBrown/90 transition-all duration-300 hover:scale-105"
            >
              Continua lo shopping
            </Link>
            
            <Link
              href="/ordini"
              className="inline-block border-2 border-darkBrown text-darkBrown px-8 py-3 rounded-lg font-semibold tracking-wider hover:bg-darkBrown/5 transition-all duration-300"
            >
              Visualizza ordini
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-12 p-6 bg-darkBrown/5 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-3 text-darkBrown">Hai domande sul tuo ordine?</h3>
            <p className="text-darkBrown/70 mb-4">
              Il nostro team di assistenza clienti è qui per aiutarti.
            </p>
            <div className="space-y-2 text-sm text-darkBrown/70">
              <p>📧 Email: support@angelicadiamonds.com</p>
              <p>📞 Telefono: +39 02 1234 5678</p>
              <p>🕐 Orari: Lun-Ven 9:00-18:00</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-darkBrown/20 py-12 bg-white/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold tracking-wider mb-4 md:mb-0">
              ANGELICA'S DIAMONDS
            </div>
            <div className="flex space-x-8 text-sm text-darkBrown/70">
              <a href="#" className="hover:text-darkBrown transition-colors">
                PRIVACY POLICY
              </a>
              <a href="#" className="hover:text-darkBrown transition-colors">
                TERMS OF SERVICE
              </a>
              <a href="#" className="hover:text-darkBrown transition-colors">
                CUSTOMER CARE
              </a>
            </div>
          </div>
          <div className="text-center mt-8 text-darkBrown/70 text-sm">
            © 2024 Angelica's Diamonds. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
