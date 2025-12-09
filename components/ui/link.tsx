'use client'
import Link from "next/link";
import { cls } from "@/utils";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
export function SidebarTab({
     link,children
    }:{ 
    link:string ,children:ReactNode

    }) {
    const pathname = usePathname()

   return (
     <Link href={link} className={cls("w-full flex items-center gap-2 px-4 py-2 rounded-xl border", pathname === link ? "bg-slate-900 text-white" : "bg-white")}> {children}</Link>
   );
 }
