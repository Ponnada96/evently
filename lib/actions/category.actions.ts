'use server'

import { CreateCategoryParams } from "@/types";
import Category from "../database/models/category.model";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";


export const createCategory = async ({ categoryName }: CreateCategoryParams) => {
    try {
        await connectToDatabase()
        const response = await Category.create({ name: categoryName })
        return JSON.parse(JSON.stringify(response))
    }
    catch (error) {
        handleError(error)
    }
}

export const getAllCategories = async () => {
    try {
        await connectToDatabase()
        const response = await Category.find()
        return JSON.parse(JSON.stringify(response))
    }
    catch (error) {
        handleError(error)
    }
}