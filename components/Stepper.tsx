'use client'
import { cls } from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

// export function Stepper() {
//   const steps = [{"Adresse", "Livraison", "Paiement"}];
//   const pathname = usePathname()
//   const router =useRouter()
//   return (
//     <div className="flex items-center gap-3">
//       {steps.map((label, i) => (
//         <React.Fragment key={label}>
//           <button onClick={() => router.push(`/${label.toLowerCase()}`)} className={cls("flex items-center gap-2 px-3 py-2 rounded-full border",
//              pathname === label.toLowerCase() ? "bg-slate-900 text-white" : "bg-white")}>
//                  <span className="w-6 h-6 rounded-full border flex items-center justify-center">{i + 1}</span> 
//                  <span className="hidden sm:inline">{label}</span> </button>
//           {i < steps.length - 1 && <div className="flex-1 h-px bg-slate-200" />}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }

export function Stepper() {
  const steps = [
    {
      id: 1,
      href: '/checkout',
      name: "Adresse"
    },
    {
      id: 2,
      href: '/checkout/shipping',
      name: "Livraison",
    }
    , {
      id: 3,
      href: '/checkout/payment',
      name: "Paiement"
    }];
    const router = useRouter()
const pathname = usePathname()
  return (
    <div className="flex items-center gap-3">
      {steps.map((label) => (
        <React.Fragment key={label.id}>
          <button onClick={() => router.push(label.href)} className={cls("flex items-center gap-2 px-3 py-2 rounded-full border", 
            pathname === label.href ? "bg-slate-900 text-white" : "bg-white")}>
            <span className="w-6 h-6 rounded-full border flex items-center justify-center">{label.id}</span>
            <span className="hidden sm:inline">{label.name}</span>
          </button>
          {label.id < steps.length  && <div className="flex-1 h-10px bg-slate-200" />}
        </React.Fragment>
      ))}
    </div>
  );
}