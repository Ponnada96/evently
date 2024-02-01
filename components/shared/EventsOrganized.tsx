import { getEventsByUser } from "@/lib/actions/event.actions"
import Collection from "./Collection"

type eventsOranizedParams = {
    userId: string,
    eventsPage: number
}
const EventsOrganized = async ({ userId, eventsPage }: eventsOranizedParams) => {
    const eventsOrganized = await getEventsByUser({
        userId, page: eventsPage
    })

    return (
        <Collection
            data={eventsOrganized?.data}
            emptyTitle="No events have been created yet!"
            emptyStateSubText="Go create some now"
            collectionType="Events_Organized"
            limit={3}
            page={eventsPage}
            urlParamName='eventsPage'
            totalPages={eventsOrganized?.totalPages}
        />
    )
}

export default EventsOrganized