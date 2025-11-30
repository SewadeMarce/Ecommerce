'use client'
import { createAdress } from "@/db/controllers/order.controller"
import { useRouter } from "next/navigation"
import { useActionState } from "react"

export function FormAdress() {
    const router = useRouter()
    const [state, action, pending] = useActionState<{ message: string ,success:boolean} | undefined, FormData>(createAdress, undefined)

    return <form action={action}
        className="grid sm:grid-cols-2 gap-3">
            <span className={`text-2xl ${state?.success? 'text-green-500':'text-red-500'}`}>{state?.message}</span>
            <span className={`text-2xl ${state?.success? 'text-green-500':'text-red-500'}`}>{state?.message}</span>
        <input name="name" placeholder="Nom complet" className="rounded-xl border px-3 py-2" required />
        <input name="phone" placeholder="Téléphone" className="rounded-xl border px-3 py-2" required />
        <input name="line1" placeholder="Adresse" className="sm:col-span-2 rounded-xl border px-3 py-2" required />
        <input name="city" placeholder="Ville" className="rounded-xl border px-3 py-2" required />
        <input name="country" placeholder="Pays" className="rounded-xl border px-3 py-2" required />

        <div className="mt-4 flex gap-2">
            <button type="submit" disabled={pending} className="px-5 py-3 rounded-2xl bg-slate-900 text-white">
                {pending? 'continuer ...':'Continuer'}
                </button>
            <button onClick={() => router.push('/l')} className="px-5 py-3 rounded-2xl border">Retour au shop</button>
        </div>
    </form>

}