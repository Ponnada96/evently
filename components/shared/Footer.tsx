import Image from "next/image"
import Link from "next/link"
import icon from '@/public/assets/images/logo.svg'

const Footer = () => {
  return (

    <footer>
      <div className="flex flex-center flex-col gap-4 p-5
            sm:flex-row flex-between w-full text-center wrapper">
        <Link href="/">
          <Image src={icon} alt="icon" width={128} height={38} />
        </Link>

        <p>
          2023 Evently. All Rights Reserved.
        </p>
      </div >
    </footer>

  )
}

export default Footer