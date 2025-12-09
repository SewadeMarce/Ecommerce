'use client'
import { deleteSession } from "@/db/controllers/user.controller"
import { LogOut } from "lucide-react"
import { ReactNode, useTransition } from "react"

export const BtnLogout = ({
  children
}: {
  children: ReactNode
}) => {
  const [pending, transition] = useTransition()

  return <button className="rounded-xl p-2 hover:bg-slate-100"
    disabled={pending} onClick={() => {
      transition(async () => {
        await deleteSession()
      })
    }}
  >
    {children}
  </button>
}