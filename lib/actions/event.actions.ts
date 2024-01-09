'use server'

import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import { CreateEventParams } from "@/types"
import User from "../database/models/user.model"
import Event from "../database/models/event.model"
import Category from "../database/models/category.model"


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