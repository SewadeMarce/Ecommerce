'use client'

import { createPayment } from "@/db/controllers/order.controller"
import { currency } from "@/utils"
import { CreditCard, ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { useActionState } from "react"

export function FormPayment({
    total
}:{
    total:number
}) {
    const router = useRouter()
const [state,action,pending]= useActionState<{ message: string, success: boolean } | undefined, FormData>(createPayment,undefined)
    return <form action={action}>
        <div className="grid sm:grid-cols-2 gap-3">
            <span>{state?.message}</span>
            <input placeholder="Titulaire de la carte" className="rounded-xl border px-3 py-2" />
            <input placeholder="Numéro de carte" className="rounded-xl border px-3 py-2" />
            <input placeholder="MM/AA" className="rounded-xl border px-3 py-2" />
            <input placeholder="CVC" className="rounded-xl border px-3 py-2" />
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
            <ShieldCheck className="w-4 h-4" />
            Vos données ne sont pas réellement transmises — démo frontend.
        </div>
        <div className="mt-4 flex gap-2">
            <button type="submit" className="px-5 py-3 rounded-2xl bg-slate-900 text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payer {currency(total)}
            </button>
            <button onClick={() => router.push('/')} className="px-5 py-3 rounded-2xl border">Retour</button>
        </div>
    </form>

}