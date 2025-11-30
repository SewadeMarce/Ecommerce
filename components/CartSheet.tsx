import { AnimatePresence, motion } from "framer-motion";
import { BadgePercent, ChevronRight, X } from "lucide-react";
import { Row } from "./ui/row";
import { currency } from "@/utils";
import CartItemControls from "./ui/btn_controllers";
import { ITCartItems } from "@/db/controllers/cart.controller";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { validateCoupon } from "@/db/controllers/coupon.controller";
import Image from "next/image";

export function CartSheet({
  open, onClose, items, subtotal, discount, shipping, taxes, total
}: {
  open: boolean, onClose: (open: boolean) => void, items: ITCartItems[], subtotal: number, discount: number, shipping: number, taxes: number, total: number
}) {
  //  { open, onClose, cart, onRemove, onUpdateQty, subtotal, discount, shipping, taxes, total, coupon, setCoupon, onCheckout }
  const router = useRouter();
  const [pending, transition] = useTransition()
  return (
    <AnimatePresence>
      {open && (
        <motion.aside initial={{ x: 480 }} animate={{ x: 0 }} exit={{ x: 480 }} transition={{ type: "spring", stiffness: 260, damping: 28 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl border-l z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-lg">Votre panier</h3>
            <button onClick={(e) => onClose(!open)} className="p-2 rounded-xl hover:bg-slate-100"><X className="w-5 h-5" /></button>
          </div>

          <div className="p-4 space-y-3 max-h-[55vh] overflow-auto">
            {items.map((it) => (
              <div key={(it._id.toString())} className="flex gap-3 border rounded-xl p-3">
                <Image src={`/images/${it.product.images[0]}`} width={20} height={20} alt={it.product.title} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold line-clamp-1">{it.product.title}</div>
                    </div>
                    <div className="font-semibold">{currency(it.product.price)}</div>
                  </div>
                
                  <CartItemControls productId={it.product._id} quantity={it.quantity} />
                </div>
              </div>
            ))}
            {items.length === 0 && <div className="text-slate-500 text-sm">Votre panier est vide.</div>}
          </div>

          <div className="p-4 border-t space-y-3">
            <div className="flex items-center gap-2">
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

            <div className="text-sm space-y-1">
              <Row label="Sous-total" value={currency(subtotal)} />
              {discount > 0 && <Row label="Remise" value={"-" + currency(discount)} />}
              <Row label="Livraison" value={shipping === 0 ? "Offerte" : currency(shipping)} />
              <Row label="Taxes" value={currency(taxes)} />
              <div className="h-px bg-slate-200 my-2" />
              <Row label={<span className="font-semibold">Total</span>} value={<span className="font-bold">{currency(total)}</span>} />
            </div>

            <button disabled={items.length === 0}
              onClick={(e) => router.push('/checkout')}
              className="w-full cursor-pointer px-5 py-3 rounded-2xl bg-slate-900 text-white flex items-center justify-center gap-2 disabled:opacity-50">
              Passer au paiement <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
