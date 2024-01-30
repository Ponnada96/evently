'use client'

import { useTransition } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'



export const DeleteConfirmation = ({ eventId }: { eventId: string }) => {
    const pathname = usePathname()
    let [isPending, startTransition] = useTransition()

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Image src="/assets/icons/delete.svg" alt="edit" width={20} height={20} className='w-5 h-5 hover:shadow-sm ' />
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-white  dark:bg-popover ">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                    <AlertDialogDescription className="p-regular-16 text-grey-600 dark:text-grey-400/90">
                        This will permanently delete this event
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction
                        onClick={() =>
                            startTransition(async () => {
                                const deleteEvent = (await import('@/lib/actions/event.actions')).deleteEvent;
                                await deleteEvent({ eventId, path: pathname })
                            })
                        }>
                        {isPending ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteConfirmation