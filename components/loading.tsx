import React from 'react'

const Loading = () => {
    return (
        <div className='flex  flex-wrap w-full h-full gap-8 justify-center items-center'>
            {Array.from({ length: 6 }, (_, index) => (
                <div key={index} role='status' className='group relative flex min-h-[380px] w-full max-w-[400px]
                        flex-col  rounded-xl bg-white dark:bg-primary-foreground shadow-md  
                        transition-all  md:min-h-[438px] animate-pulse'>

                    <div className='w-full h-[207px] bg-gray-200 dark:bg-gray-700'></div>
                    <div className='flex mt-2 gap-3 ml-4'>
                        <div className='w-16 h-8 rounded-2xl bg-gray-200 dark:bg-gray-700'></div>
                        <div className='w-32 h-8 rounded-2xl bg-gray-200 dark:bg-gray-700'></div>
                    </div>
                    <div className='mt-8 ml-4'>
                        <div className='w-1/2 h-4 bg-gray-200 dark:bg-gray-700'></div>
                        <div className='w-10/12 h-4 bg-gray-200 dark:bg-gray-700 mt-8'></div>
                        <div className='w-10/12 h-4 bg-gray-200 dark:bg-gray-700 mt-2'></div>
                        <div className='w-1/2 h-4 bg-gray-200 dark:bg-gray-700 mt-2'></div>
                        <div className='w-1/2 h-4 bg-gray-200 dark:bg-gray-700 mt-4'></div>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default Loading