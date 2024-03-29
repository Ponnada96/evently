'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import searchIcon from '@/public/assets/icons/search.svg'
import { Input } from '../ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'

const Search = ({ placeholder = 'Search title...' }: { placeholder?: string }) => {
    const [query, setQuery] = useState('')
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            let newUrl = ''
            if (query) {
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'query',
                    value: query
                })
            }
            else {
                newUrl = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['query'],
                })
            }
            router.push(newUrl, { scroll: false })
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [query, router, searchParams])

    return (
        <div className='flex-center min-h-[54px] w-full 
                        overflow-hidden rounded-full bg-grey-50 dark:bg-grey-600 px-4 py-2'>
            <Image src={searchIcon} alt='search' height={24} width={24} />
            <Input type='text' placeholder={placeholder}
                onChange={(e) => setQuery(e.target.value)}
                className='bg-grey-50 dark:bg-grey-600 border-0 p-regular-16 outline-offset-0
                           placeholder:text-gray-500   dark:placeholder:text-gray-300 focus:border- focus-visible:ring-0
                           focus-visible:ring-offset-0'/>
        </div>
    )
}

export default Search