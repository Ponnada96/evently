import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventById, getEventsByUser } from '@/lib/actions/event.actions'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Profile = async () => {

    const { sessionClaims } = auth()
    const userId = sessionClaims?.userId as string;

    const eventsOrganized = await getEventsByUser({ userId, page: 1 })

    return (
        <>
            {/* My Tickets */}
            <section className='bg-primary-50 bg-dotted-pattern 
                        bg-cover bg-center py-5 md:py-10'>
                <div className='wrapper flex items-center justify-center sm:justify-between'>
                    <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
                    <Button asChild className='button hidden sm:flex' size={'lg'}>
                        <Link href='/#events'>
                            Explore Events
                        </Link>
                    </Button>
                </div>
            </section>
            <section className='wrapper py-8'>
                <Collection
                    data={[]}
                    emptyTitle="No event tickets purchased yet"
                    emptyStateSubText="No worries - plenty of exciting events to explore!"
                    collectionType="My_Tickets"
                    limit={3}
                    page={1}
                    urlParamName='ordersPage'
                    totalPages={2}
                />
            </section>

            {/* Events Organized */}
            <section className='bg-primary-50 bg-dotted-pattern 
                        bg-cover bg-center py-5 md:py-10'>
                <div className='wrapper flex items-center justify-center sm:justify-between'>
                    <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
                    <Button asChild size={'lg'} className='button hidden sm:flex'>
                        <Link href='/events/create'>
                            Create New Event
                        </Link>
                    </Button>
                </div>
            </section>
            <section className='wrapper py-8'>
                <Collection
                    data={eventsOrganized?.data}
                    emptyTitle="No events have been created yet!"
                    emptyStateSubText="Go create some now"
                    collectionType="Events_Organized"
                    limit={6}
                    page={1}
                    urlParamName='eventsPage'
                    totalPages={2}
                />
            </section>
        </>
    )
}

export default Profile