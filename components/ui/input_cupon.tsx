'use client'
import { validateCoupon } from "@/db/controllers/coupon.controller";
import { BadgePercent } from "lucide-react";
import { useTransition } from "react";

export function InputCoupon() {
    
  const [pending, transition] = useTransition()

    return <div className="flex items-center gap-2">
              <BadgePercent className="w-4 h-4" />
              <input
                placeholder="Code promo (ex: WELCOME10)"
                defaultValue=''
                onBlur={(e) => {
                  const code = e.target.value.trim().toUpperCase();
                  if (!code) return;
                  console.log(code);
                  transition(async () => {
                    console.log('transition en cours ...');
                    const valid = await validateCoupon(code);
                    console.log(valid);
                    
                    if (valid.success) console.log('code valide'); else console.log("Code invalide");

                  });


                }}
                className="flex-1 rounded-xl border px-3 py-2"
              />
            </div>
}