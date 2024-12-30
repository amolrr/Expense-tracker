import { redirect } from "react-router-dom";
import { deleteItem } from "../Components/Helpers";
import toast from "react-hot-toast";

export async function logoutAction(){
    //delete the user
    deleteItem({
        key:"userName"
    })

    deleteItem({
        key:"budgets"
    })
    deleteItem({
        key:"expenses"
    })
    
    toast.success("Loggout !!")
    //return redirect
    return redirect("/")
} 

