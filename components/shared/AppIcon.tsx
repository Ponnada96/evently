
import Link from 'next/link'
import Image from "next/image"
import icon from '@/public/assets/images/logo1.svg'

const AppIcon = () => {

    return (
        <Link href="/" className="w-36">
            <Image src={icon} 
                width={128} height={38} alt={"Evently logo"} />
        </Link>
    )
}
export default AppIcon