import { IEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import Arrow from '@/public/assets/icons/arrow.svg'
import Edit from '@/public/assets/icons/edit.svg'
import Image from 'next/image'
import { auth } from '@clerk/nextjs'
import DeleteConfirmation from './DeleteConfirmation'

type CardProps = {
    event: IEvent,
    hasOrderLink?: boolean,
    hidePrice: boolean
}

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {

    const session = auth();
    const userId = session.sessionClaims?.userId as string;
    const isEventCreator = userId === event.organizer._id as string

    return (
        <div className='group relative flex min-h-[380px] w-full max-w-[400px]
                        flex-col overflow-hidden rounded-xl bg-white shadow-md
                        transition-all hover:shadow-lg md:min-h-[438px]'>

            <Link href={`/events/${event._id}`}
                style={{ backgroundImage: `url(${event.imageUrl})` }}
                className='flex-center flex-grow bg-gray-50
                           bg-cover bg-center text-grey-500'
            />

            {
                isEventCreator && !hidePrice && (
                    <div className='absolute top-2 right-2 flex flex-col gap-4 rounded-xl
                                    bg-white p-3 shadow-sm transition-all'>
                        <Link href={`/events/${event._id}/update`}>
                            <Image src={Edit} alt='edit' width={20} height={20} />
                        </Link>
                        <DeleteConfirmation eventId={event._id}/>
                    </div>
                )
            }

            <Link href={`/events/${event._id}`}
                className='flex flex-col gap-5 md:gap-4 min-h-[230px] p-4' >
                {!hidePrice &&

                    <div className='flex gap-2'>
                        <span className='p-semibold-14 w-min rounded-full
                     bg-green-100 px-4 py-2 text-green-60'>
                            {event.isFree ? "FREE" : `$${event.price}`}
                        </span>
                        <p className='p-semibold-14 w-min rounded-full 
                              bg-grey-500/10 px-4 py-2 text-grey-500'>
                            {event.category.name}
                        </p>
                    </div>
                }

                <p className='p-medium-16 p-medium-18 text-grey-500'>
                    {formatDateTime(event.startDateTime).dateTime}
                </p>

                <p className='p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black'>
                    {event.title}
                </p>

                <div className='flex-between w-full'>
                    <p className='p-medium-14 md:p-medium-16 text-grey-600'>
                        {event.organizer.firstName} {event.organizer.lastName}
                    </p>
                    {
                        !hasOrderLink && (
                            <Link className='flex gap-2' href={`orders?eventId=${event._id}`}>
                                <p className='text-primary-500'>Order Details</p>
                                <Image src={Arrow} alt="arrow icon" width={10} height={10} />
                            </Link>
                        )
                    }
                </div>
            </Link>

        </div>
    )
}

export default Card