'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'

type PaginationProps = {
    page: number | string,
    totalPages: number,
    urlParamName?: string
}
const Pagination = ({ urlParamName, page, totalPages }
    : PaginationProps) => {

    const router = useRouter()
    const searchParams = useSearchParams()

    const onClick = async (btnType: 'prev' | 'next') => {
        const pageValue = btnType === 'next'
            ? Number(page) + 1
            : Number(page) - 1

        const formUrlQuery = (await import('@/lib/utils')).formUrlQuery;
        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: urlParamName || 'page',
            value: pageValue.toString()
        })
        router.push(newUrl, { scroll: false })
    }

    return (
        <div className='flex gap-4'>
            <Button size={'lg'} variant={'outline'}
                className='w-28'
                onClick={() => onClick('prev')}
                disabled={Number(page) <= 1}>
                Previous
            </Button>
            <Button size={'lg'} variant={'outline'}
                className='w-28'
                onClick={() => onClick('next')}
                disabled={Number(page) >= totalPages}>
                Next
            </Button>
        </div>
    )
}

export default Pagination