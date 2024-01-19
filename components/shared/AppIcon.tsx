'use client'

import Link from 'next/link'
import Image from "next/image"
import icon from '@/public/assets/images/logo.svg'
import darkIcon from '@/public/assets/images/logo-Dark.svg'
import { useTheme } from 'next-themes'

const AppIcon = () => {
    const { theme } = useTheme()
    return (
        <Link href="/" className="w-36">
            <Image src={theme === 'dark' ? darkIcon : icon} 
                width={128} height={38} alt={"Evently logo"} />
        </Link>
    )
}
export default AppIcon