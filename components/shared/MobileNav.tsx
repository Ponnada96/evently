import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image";
import MenuIcon from '@/public/assets/icons/menu.svg'
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";
import AppIcon from "./AppIcon";


const MobileNav = () => {
    return (
        <nav className="md:hidden">
            <Sheet>
                <SheetTrigger>
                    <Image
                        src={MenuIcon} alt="menu" width={24}
                        height={24} className="cursor-pointer dark:filter-grey " />
                </SheetTrigger>
                <SheetContent className="flex flex-col bg-white  dark:bg-popover  gap-6 md:hidden">
                    <AppIcon />
                    <Separator className="border-gray-50 border" />
                    <NavItems />
                </SheetContent>
            </Sheet>
        </nav>)
}

export default MobileNav;