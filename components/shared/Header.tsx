import Link from "next/link"
import icon from '@/public/assets/images/logo.svg'
import Image from "next/image"
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "../ui/button"


const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image src={icon} width={128} height={38} alt={"Evently logo"} />
        </Link>
        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/"></UserButton>
          </SignedIn>
          <SignedOut>
            <Button className="rounded-full" size="lg" >
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header