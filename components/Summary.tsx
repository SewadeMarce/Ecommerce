import { BadgePercent, Link, Package, ShieldCheck, Truck } from "lucide-react";
import { Card } from "./Card";
import { Row } from "./ui/row";
import { getCart } from "@/db/controllers/cart.controller";
import { currency } from "@/utils";
import { InputCoupon } from "./ui/input_cupon";

export async function Summary() {
    const {
        items,
        totalAmount,
        shipping,
        taxes,
        total,
        subtotal,
        discount } = await getCart()
    return <div className="space-y-4">
        <Card title="Récapitulatif">
            <div className="space-y-3 max-h-80 overflow-auto pr-1">
                {items?.map((it) => (
                    <div key={(it._id).toString()} className="flex items-start gap-3">
                        <img src={`/images/${it.product.images[0]}`} alt={it.product.title} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1 text-sm">
                            <div className="font-medium">{it.product.title}</div>
                            <div className="text-slate-600">x{it.quantity} — {currency(it.price)}</div>
                        </div>
                    </div>
                ))}
                {items?.length === 0 && <div className="text-sm text-slate-500">Panier vide.</div>}
            </div>

            <div className="mt-4 space-y-1 text-sm">
                <Row label="Sous-total" value={currency(subtotal)} />
                {discount > 0 && <Row label="Remise" value={"-" + currency(discount)} />}
                <Row label="Livraison" value={shipping === 0 ? "Offerte" : currency(shipping)} />
                <Row label="Taxes" value={currency(taxes)} />
                <div className="h-px bg-slate-200 my-2" />
                <Row label={<span className="font-semibold">Total</span>} value={<span className="font-bold">{currency(total)}</span>} />
            </div>

            <div className="mt-4">
               <InputCoupon />
            </div>
        </Card>

        <Card title="Sécurité & avantages">
            <div className="space-y-2 text-sm text-slate-700">
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Paiement sécurisé</div>
                <div className="flex items-center gap-2"><Truck className="w-4 h-4" /> Livraison suivie</div>
                <div className="flex items-center gap-2"><Package className="w-4 h-4" /> Retours faciles</div>
            </div>
        </Card>

        <Link href={'/catalog'} className="w-full px-5 py-3 rounded-2xl border">Continuer vos achats</Link>
    </div>
}