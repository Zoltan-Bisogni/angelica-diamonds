import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Verifica che la chiave segreta di Stripe sia configurata
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY non è configurata nelle variabili d\'ambiente');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'eur', items } = await request.json();
    
    console.log('API: Richiesta ricevuta con items:', items);
    console.log('API: Numero di items diversi:', items?.length || 0);
    console.log('API: Currency:', currency);
    
    // Validazione: assicuriamoci di avere degli items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Nessun articolo specificato per il checkout' },
        { status: 400 }
      );
    }

    // Ottieni l'origine della richiesta per costruire URL assoluti
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    console.log('API: Origin:', origin);
    
    // Creare Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: { name: string; description?: string; category: string; image?: string; price: number; quantity: number }) => {
        // Costruisci URL assoluto per l'immagine
        const imageUrl = item.image
          ? item.image.startsWith('http')
            ? item.image
            : `${origin}${item.image.startsWith('/') ? '' : '/'}${item.image}`
          : undefined;
          // Rimuovi l'immagine dal prodotto Stripe impostando images su un array vuoto
        return {
          price_data: {
            currency,
            product_data: {
              name: item.name,
              description: item.description || `Gioiello di categoria: ${item.category}`,
              images: imageUrl ? [imageUrl] : [],
            },
            unit_amount: Math.round(item.price * 100), // Stripe lavora in centesimi
          },
          quantity: item.quantity,
        };
      }),
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cart`,
      metadata: {
        itemNames: items.map((item: { name: string }) => item.name).join(", ")
      },
      shipping_address_collection: {
        allowed_countries: ['IT', 'US', 'GB', 'FR', 'DE', 'ES'],
      },
      billing_address_collection: 'required',
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Errore nella creazione della Checkout Session:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
