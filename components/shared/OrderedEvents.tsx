import Collection from "./Collection"
import { getOrdersByUser } from "@/lib/actions/order.actions"
import { IOrder } from "@/lib/database/models/order.model"

type eventsOranizedParams = {
    userId: string,
    ordersPage: number
}
const OrderedEvents = async ({ userId, ordersPage }: eventsOranizedParams) => {
    const orders = await getOrdersByUser({ userId, page: ordersPage })
    const orderedEvents = orders?.data.map((order: IOrder) => order.event || [])

    return (
        <Collection
            data={orderedEvents}
            emptyTitle="No event tickets purchased yet"
            emptyStateSubText="No worries - plenty of exciting events to explore!"
            collectionType="My_Tickets"
            limit={3}
            page={ordersPage}
            urlParamName='ordersPage'
            totalPages={orders?.totalPages}
        />
    )
}

export default OrderedEvents