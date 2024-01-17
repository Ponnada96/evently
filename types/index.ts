export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
}

export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
}

//Category Params
export type CreateCategoryParams = {
    categoryName: string;
}

//Event Params
export type CreateEventParams = {
    userId: string
    event: {
        title: string;
        description: string;
        location: string;
        imageUrl: string;
        startDateTime: Date;
        endDateTime: Date;
        categoryId: string;
        price: string;
        isFree: boolean;
        url: string;
    }
    path: string
}

export type GetAllEventParams = {
    query: string
    category: string
    limit: number
    page: number
}

export type DeleteEventParams = {
    eventId: string
    path: string
}

export type UpdateEventParams = {
    userId: string
    event: {
        _id: string
        title: string
        imageUrl: string
        description: string
        location: string
        startDateTime: Date
        endDateTime: Date
        categoryId: string
        price: string
        isFree: boolean
        url: string
    }
    path: string
}

export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}


export type GetRelatedEventsByCategoryParams = {
    categoryId: string
    eventId: string
    limit?: number
    page: number | string
}

export type GetEventsByUserParams = {
    userId: string
    limit?: number
    page: number
}

export type CheckoutOrderParams = {
    eventTitle: string
    eventId: string
    price: string
    isFree: boolean
    buyerId: string
}

export type CreateOrderParams = {
    stripeId: string
    eventId: string
    buyerId: string
    totalAmount: string
    createdAt: Date
}


export type GetOrdersByEventParams = {
    eventId: string
    searchString: string
}

export type GetOrdersByUserParams = {
    userId: string | null,
    limit?: number,
    page: string | number | null
}

export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
}

export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
}