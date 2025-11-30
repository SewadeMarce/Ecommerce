import { LogOut } from "lucide-react"

export const BtnLogout = ()=> {

    return  <button className="rounded-xl p-2 hover:bg-slate-100" 
    //onClick={onLogout}
    >
                  <LogOut className="w-6 h-6" />
                </button>
}