import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image";
import MenuIcon from '@/public/assets/icons/menu.svg'
import Icon from '@/public/assets/images/logo.svg'
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";


const MobileNav = () => {
    return (
        <nav className="md:hidden">
            <Sheet>
                <SheetTrigger>
                    <Image
                        src={MenuIcon} alt="menu" width={24}
                        height={24} className="cursor-pointer" />
                </SheetTrigger>
                <SheetContent className="flex flex-col bg-white gap-6 md:hidden">
                    <Image src={Icon} alt="icon" width={128} height={38} />
                    <Separator className="border-gray-50 border" />
                    <NavItems />
                </SheetContent>
            </Sheet>
        </nav>)
}

export default MobileNav;