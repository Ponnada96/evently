import { getAllEvents } from '@/lib/actions/event.actions';
import React from 'react'
import Collection from './Collection';

type eventsParams = {
    page: number,
    searchText: string,
    category: string
}

const AllEvents = async ({ searchText, category, page }: eventsParams) => {

    const events = await getAllEvents({
        query: searchText,
        category: category,
        limit: 6,
        page: page
    });
    return (
        <Collection
            data={events?.data}
            emptyTitle="No Events Found"
            emptyStateSubText="Come back later"
            collectionType="All_Events"
            limit={3}
            page={page}
            totalPages={events?.totalPages}
        />
    )
}

export default AllEvents