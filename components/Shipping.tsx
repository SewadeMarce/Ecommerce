'use client'

import { createShipping } from "@/db/controllers/order.controller"
import { cls, currency } from "@/utils"
import { useRouter } from "next/navigation"
import { useActionState, useState, useTransition } from "react"

export function UiShipping({
    shipping
}: {
    shipping: number
}) {
    const [shipMethod, setShipMethod] = useState("standard");
    const [pending,transition,]= useTransition()
    const router = useRouter()
    return <div>
        <div className="grid sm:grid-cols-2 gap-3">
            <label className={cls("rounded-2xl border p-4 cursor-pointer", shipMethod === "standard" ? "ring-2 ring-slate-900" : "")}>
                <input className="hidden" type="radio" name="ship"
                    onChange={() => setShipMethod("standard")}
                    checked={shipMethod === "standard"} />
                Standard (48-72h) — {shipping === 0 ? "Offert" : currency(shipping)}
            </label>
            <label className={cls("rounded-2xl border p-4 cursor-pointer", shipMethod === "express" ? "ring-2 ring-slate-900" : "")}>
                <input className="hidden" type="radio" name="ship"
                    onChange={() => setShipMethod("express")}
                    checked={shipMethod === "express"} />
                Express (24h) — {currency(14.9)}
            </label>
        </div>
        <div className="mt-4 flex gap-2">
            <button onClick={()=>{transition(async () =>{
                await createShipping(shipMethod)
            })}} className="px-5 py-3 rounded-2xl bg-slate-900 text-white">Continuer</button>
            <button onClick={() => router.push('/')} className="px-5 py-3 rounded-2xl border">Retour</button>
        </div>
    </div>
}