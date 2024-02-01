import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/public/assets/images/hero.png"
import Search from "@/components/shared/Search";
import { SearchParamProps } from "@/types";
import CategoryFilter from "@/components/shared/CategoryFilter";
import AllEvents from "@/components/shared/AllEvents";
import { Suspense } from "react";
import EventsSkeletion from "@/components/EventsSkeleton";

export default async function Home({ searchParams }: SearchParamProps) {

  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Host, Connect, Celebrate: Your Events, Our Platform!</h1>
            <p className="p-regular-20  md:p-regular-24">
              Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.
            </p>
            <Button size={"lg"} asChild className="button w-full sm:w-fit" >
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>
          <Image src={Hero} alt="Hero" width={1000} height={1000} priority
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]" />
        </div>
      </section>

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold" >Trust by <br /> Thousand of Events</h2>
        <div className="flex flex-col w-full gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>
        <Suspense fallback={<EventsSkeletion length={6}/>}>
          <AllEvents page={page} searchText={searchText} category={category} />
        </Suspense>
      </section>
    </>
  )
}
