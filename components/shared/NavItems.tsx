'use client'

import { headerLinks } from "@/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavItems = () => {
    const pathName = usePathname();
    return <ul className="flex flex-col w-full md:flex-row md:justify-between items-start gap-5">
        {headerLinks.map((link) => {
            const isActive = pathName === link.route;
            return <li key={link.route}
                className={`${isActive && 'text-primary-500'} 
                         flex-center p-medium-16 whitespace-nowrap`}>
                <Link href={link.route}>{link.label}</Link>
            </li>
        })}
    </ul>
}

export default NavItems