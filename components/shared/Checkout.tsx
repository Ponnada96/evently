import { IEvent } from '@/lib/database/models/event.model'
import React from 'react'
import { Button } from '../ui/button'

type checkoutProps = {
    event: IEvent,
    userId: string
}

const onCheckout = async () => {
    console.log('Checkout')
}

const Checkout = ({ event, userId }: checkoutProps) => {
    return (
        <form action={onCheckout} method='post'>
            <Button>
              {event.isFree ? 'Get Ticket': 'Buy Ticket'}
            </Button>
        </form>
    )
}

export default Checkout