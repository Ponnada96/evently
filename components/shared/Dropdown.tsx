import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ICategory } from "@/lib/database/models/category.model"
import { startTransition, useEffect, useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "../ui/input"
import { getAllCategories } from "@/lib/actions/category.actions"


type DropdownProps = {
    onChangeHandler?: () => void,
    value?: string
}
const Dropdown = ({ onChangeHandler, value }: DropdownProps) => {

    const [categories, setCategories] = useState<ICategory[]>([])

    const [newCategory, setNewCategory] = useState("");

    const handleAddCategory = () => {
        (import('@/lib/actions/category.actions')).then(({ createCategory }) => {
            createCategory({ categoryName: newCategory.trim() })
                .then((category) => {
                    setCategories((previousCategories) => [...previousCategories, category])
                })
        });
    }

    useEffect(() => {
        const getCategories = async () => {
            const categoriesList = await getAllCategories();
            categoriesList && setCategories(categoriesList as ICategory[])
        }
        getCategories()
    }, [])

    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                {categories.length > 0 &&
                    categories.map((category) => {
                        return <SelectItem key={category._id} value={category._id} className="select-item p-regular-14">
                            {category.name}
                        </SelectItem>
                    })
                }
                <AlertDialog>
                    <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm
                         hover:bg-primary-50 focus:text-primary-500">Add new category</AlertDialogTrigger>
                    <AlertDialogContent className="bg-white dark:bg-popover ">
                        <AlertDialogHeader>
                            <AlertDialogTitle>New Category</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Input type="text" className="input-field"
                                    placeholder="Category Name"
                                    onChange={(e) => setNewCategory(e.target.value)} />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel >Cancel </AlertDialogCancel>
                            <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </SelectContent>
        </Select>

    )
}

export default Dropdown