import Link from "next/link"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"
import ThemeSwitch from "./ThemeSwitch"
import AppIcon from "./AppIcon"


const Header = () => {

  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <AppIcon />

        <SignedIn>
          <nav className=" md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/"></UserButton>
            <MobileNav />
          </SignedIn>

          <SignedOut>
            <Button asChild className="rounded-full" size="lg" >
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
          </SignedOut>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}

export default Header