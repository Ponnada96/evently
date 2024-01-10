import EventForm from "@/components/shared/EventForm"
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs"

type EventUpdateProps={
  params:{
        id: string;
  }
}

const updateEvent = async ({ params: { id } }: EventUpdateProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const event = await getEventById(id);

    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern 
                            bg-cover bg-center py-5 md:py-10">
                <h3 className="h3-bold text-center wrapper sm:text-left ">Update Event</h3>
            </section>
            <section className="wrapper">
                <EventForm userId={userId} 
                            type="update" 
                            event={event} 
                            eventId={event._id} />
            </section>
        </>

    )
}

export default updateEvent