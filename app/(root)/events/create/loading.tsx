import EventFormSkeleton from '@/components/EventFormSkeleton'
import React from 'react'

const loading = () => {
    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern 
                            bg-cover bg-center py-5 md:py-10">
                <h3 className="h3-bold text-center wrapper sm:text-left ">Create Event</h3>
            </section>
            <EventFormSkeleton />
        </>
    )
}

export default loading