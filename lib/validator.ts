import * as z from 'zod'

export const eventSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(3, 'Description must be 3 characters')
        .max(400, 'Description must be at least 400 characters'),
    location: z.string().min(3, 'Location must be 3 characters')
        .max(400, 'Location must be at least 400 characters'),
    imageUrl: z.string().min(1, "Image is required"),
    startDateTime: z.coerce.date(),
    endDateTime: z.coerce.date(),
    categoryId: z.string().min(1, "Category is required"),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url()
}).refine(data => data.startDateTime < data.endDateTime, {
    message: 'End date must be after start date',
    path: ['endDateTime']
}).refine(data => data.price || data.isFree, {
    message: 'Please provide the price or mark as free',
    path: ['price']
})

export type eventSchemaType = z.infer<typeof eventSchema>