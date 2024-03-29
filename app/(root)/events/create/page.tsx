import EventForm from "@/components/shared/EventForm"
import { auth } from "@clerk/nextjs"

const createEvent = () => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern 
                            bg-cover bg-center py-5 md:py-10">
                <h3 className="h3-bold text-center wrapper sm:text-left ">Create Event</h3>
            </section>
            <section className="wrapper">
                <EventForm userId={userId} type="create" />
            </section>
        </>
    )
}

export default createEvent