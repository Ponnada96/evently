"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form, FormControl, FormField, FormItem, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventSchema, eventSchemaType } from "@/lib/validator"
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import FileUploader from "./FileUploader"
import { useEffect, useState } from "react"
import Image from "next/image"
import LocationIcon from '@/public/assets/icons/location-grey.svg'
import CalenderIcon from '@/public/assets/icons/calendar.svg'
import DollarIcon from '@/public/assets/icons/dollar.svg'
import LinkIcon from '@/public/assets/icons/link.svg'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox"
import { useUploadThing } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import { IEvent } from "@/lib/database/models/event.model"


type eventParams = {
    userId: string;
    type: "create" | "update",
    event?: IEvent
    eventId?: string
}

const EventForm = ({ userId, type, event, eventId }: eventParams) => {

    const form = useForm<eventSchemaType>({
        resolver: zodResolver(eventSchema),
        defaultValues: type === 'update' && event ?
            {
                ...event, startDateTime: new Date(event.startDateTime),
                endDateTime: new Date(event.endDateTime),
                categoryId: event.category._id
            }
            : eventDefaultValues
    })

    console.log(form.getValues())
    const [files, setFiles] = useState<File[]>([])
    const { startUpload } = useUploadThing('imageUploader')
    const router = useRouter()

    const isFree = form.getValues('isFree');

    useEffect(() => {
        if (isFree) {
            form.resetField('price')
        }
    }, [isFree])

    async function onSubmit(values: eventSchemaType) {
        let uploadImageUrl = values.imageUrl;

        if (files.length > 0) {
            const uploadedImages = await startUpload(files)
            if (!uploadedImages) {
                return;
            }
            uploadImageUrl = uploadedImages[0].url
        }

        if (type === 'create') {
            try {
                const newEvent = await createEvent({
                    event: { ...values, imageUrl: uploadImageUrl },
                    userId,
                    path: '/profile'
                })
                if (newEvent) {
                    form.reset()
                    router.push(`/events/${newEvent._id}`)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        if (type === 'update') {
            if (!event) {
                router.back();
                return;
            }

            try {
                const updatedEvent = await updateEvent({
                    userId,
                    event: { ...values, _id: eventId!, imageUrl: uploadImageUrl },
                    path: `/events/${eventId}`
                })

                if (updatedEvent) {
                    form.reset()
                    router.push(`/events/${updatedEvent._id}`)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Event title" className="input-field" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Dropdown onChangeHandler={field.onChange} value={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <Textarea className="textarea rounded-2xl" placeholder="description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <FileUploader imageUrl={field.value} onFieldChange={field.onChange} setFiles={setFiles} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center  bg-grey-50 dark:bg-grey-600 h-[54px] w-full overflow-hidden rounded-full px-4 py-2">
                                        <Image src={LocationIcon} alt="location" height={24} width={24} />
                                        <Input className="input-field" placeholder="Event location or Online" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="startDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center bg-grey-50 dark:bg-grey-600 h-[54px] w-full overflow-hidden rounded-full px-4 py-2">
                                        <Image src={CalenderIcon} alt="calender" height={24} width={24} className="filter-grey" />
                                        <p className="ml-3 text-gray-600 dark:text-gray-300  whitespace-nowrap">Start Date:</p>
                                        <DatePicker selected={field.value}
                                            onChange={(date: Date) => field.onChange(date)}
                                            minDate={new Date()}
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            wrapperClassName="datePicker" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center bg-grey-50 dark:bg-grey-600 h-[54px] w-full overflow-hidden rounded-full px-4 py-2">
                                        <Image src={CalenderIcon} alt="calender" height={24} width={24} className="filter-grey" />
                                        <p className="ml-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">End Date:</p>
                                        <DatePicker selected={field.value}
                                            onChange={(date: Date) => field.onChange(date)}
                                            minDate={new Date()}
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            wrapperClassName="datePicker" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center bg-grey-50  dark:bg-grey-600 h-[54px] w-full overflow-hidden rounded-full px-4 py-2">
                                        <Image src={DollarIcon} alt="dollar" height={24} width={24} className="filter-grey" />
                                        <Input {...field} disabled={isFree} type="number" placeholder="price" className="p-regular-16 border-0 bg-grey-50 dark:bg-grey-600 dark:placeholder:text-gray-300  outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                        <FormField
                                            control={form.control}
                                            name="isFree"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="flex items-center">
                                                            <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                                Free Ticket
                                                            </label>
                                                            <Checkbox className="mr-2 h-6 w-6 border-[3px] border-primary-500"
                                                                checked={field.value} onCheckedChange={field.onChange} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center bg-grey-50 dark:bg-grey-600 h-[54px] w-full overflow-hidden rounded-full px-4 py-2">
                                        <Image src={LinkIcon} alt="location" height={24} width={24} />
                                        <Input className="input-field" placeholder="URL" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" size={"lg"}
                    className="button col-span-2 w-full"
                    disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Submitting...' : `${type} Event `}
                </Button>
            </form>
        </Form>
    )
}

export default EventForm