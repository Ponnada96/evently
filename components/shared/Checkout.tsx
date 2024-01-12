'use client'

import { IEvent } from '@/lib/database/models/event.model'
import React from 'react'
import { Button } from '../ui/button'
import { checkoutOrder } from '@/lib/actions/order.actions';
import { loadStripe } from '@stripe/stripe-js';

type checkoutProps = {
    event: IEvent,
    userId: string
}

loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Checkout = ({ event, userId }: checkoutProps) => {

    React.useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    const onCheckout = async () => {
        const order = {
            eventTitle: event.title,
            eventId: event._id,
            price: event.price,
            isFree: event.isFree,
            buyerId: userId
        }
        await checkoutOrder(order)
    }


    return (
        <form action={onCheckout} method='post'>
            <Button>
                {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
            </Button>
        </form>
    )
}

export default Checkout