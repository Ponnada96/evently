'use server'

import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import { CreateEventParams, DeleteEventParams, GetAllEventParams, GetRelatedEventsByCategoryParams, UpdateEventParams } from "@/types"
import User from "../database/models/user.model"
import Event from "../database/models/event.model"
import Category from "../database/models/category.model"
import { revalidatePath } from "next/cache"


const populateEvent = async (query: any) => {
    return query
        .populate({ path: 'category', model: Category, select: '_id name' })
        .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
}

export const createEvent = async ({ event, userId, path }: CreateEventParams) => {
    try {
        await connectToDatabase();
        const organizer = await User.findById(userId);
        if (!organizer) {
            throw new Error("Organizer not found")
        }
        const newEvent = await Event.create({
            ...event,
            category: event.categoryId,
            organizer: userId
        })
        return JSON.parse(JSON.stringify(newEvent));
    }
    catch (error) {
        handleError(error)
    }
}

export const getEventById = async (eventId: string) => {
    try {
        await connectToDatabase()
        const eventDetails = await populateEvent(Event.findById(eventId));
        return JSON.parse(JSON.stringify(eventDetails));
    }
    catch (error) {
        handleError(error)
    }
}

export const getAllEvents = async ({ query, limit = 6, page, category }: GetAllEventParams) => {

    try {
        await connectToDatabase()
        const conditions = {}
        const eventsQuery = Event.find(conditions)
            .skip(0)
            .limit(limit)

        const events = await populateEvent(eventsQuery);
        const eventsCount = await Event.countDocuments(conditions)

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit)
        }
    }
    catch (error) {
        handleError(error)
    }
}

export const deleteEvent = async ({ eventId, path }: DeleteEventParams) => {
    try {
        await connectToDatabase()

        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (deletedEvent) {
            revalidatePath(path)
        }
    }
    catch (error) {
        handleError(error)
    }
}

export const updateEvent = async ({ userId, event, path }: UpdateEventParams) => {
    try {
        await connectToDatabase();
        const eventToUpdate = await Event.findById(event._id)
        if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
            throw new Error('Unauthorized or event not found')
        }

        const updatedEvent = await Event.findByIdAndUpdate(event._id,
            { ...event, category: event.categoryId }, { new: true })

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedEvent));
    }
    catch (error) {
        handleError(error)
    }
}

export const getRelatedEventsByCategory = async ({
    categoryId,
    eventId,
    limit = 3,
    page = 1
}: GetRelatedEventsByCategoryParams) => {
    try{
        await connectToDatabase()

        const skipCount = (Number(page) - 1) * limit
        const conditions = { $and: [{ category: categoryId }, { _id: { $ne: eventId } }] }

        const eventsQuery = Event.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipCount)
            .limit(limit)
        const events = await populateEvent(eventsQuery)
        const eventsCount = await Event.countDocuments(conditions)
        return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
    }
    catch (error) {
        handleError(error)
    }
}

