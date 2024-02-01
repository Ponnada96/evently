import EventsSkeletion from '@/components/EventsSkeletion';
import React from 'react';

const loading = () => {
  return (
    <>
      <section
        role='staus'
        className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain animate-pulse'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl w-full'>
          <div className='md:min-h-[600px] min-h-[352px] bg-gray-200 dark:bg-gray-700 w-full'></div>
          <div className='gap-10 flex flex-col m-10 justify-between'>
            <div className='flex flex-col gap-4'>
              <div className='w-1/2 h-6 bg-gray-200 dark:bg-gray-700 '></div>
              <div className='w-10/12 h-6 bg-gray-200 dark:bg-gray-700'></div>
              <div className='w-10/12 h-6 bg-gray-200 dark:bg-gray-700'></div>
            </div>
            <div className='flex flex-row items-center gap-10'>
              <div className='w-20 h-10 rounded-full bg-gray-200 dark:bg-gray-700'></div>
              <div className='w-[162px] h-16 rounded-full bg-gray-200 dark:bg-gray-700'></div>
              <div className='w-20 h-10 rounded-sm bg-gray-200 dark:bg-gray-700'></div>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='w-10/12 h-6 bg-gray-200 dark:bg-gray-700 '></div>
              <div className='w-1/2 h-6 bg-gray-200 dark:bg-gray-700 '></div>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='w-10/12 h-6 bg-gray-200 dark:bg-gray-700 '></div>
              <div className='w-10/12 h-6 bg-gray-200 dark:bg-gray-700 '></div>
              <div className='w-10/12 h-6 bg-gray-200 dark:bg-gray-700 '></div>
              <div className='w-1/2 h-6 bg-gray-200 dark:bg-gray-700 '></div>
            </div>
          </div>
        </div>
      </section>
      {/* Events From the Same Category  */}
      <section className='wrapper my-8 flex flex-col gap-8 md:gap-12'>
        <h2 className='h2-bold'>Related Events</h2>
        <EventsSkeletion length={3} />
      </section>
    </>
  );
};

export default loading;
