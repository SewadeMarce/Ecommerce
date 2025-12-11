import { Galeries } from "@/components/galerie";
import { BtnAdd } from "@/components/ui/btn_add";
import CartItemControls from "@/components/ui/btn_controllers";
import { getProductOfCart } from "@/db/controllers/cart.controller";
import { getProduct } from "@/db/controllers/ecommerce.controller";
import { cls, currency } from "@/utils";
import { ChevronLeft, CreditCard, Heart, Package, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import Image from "next/image";

export default async function ProductDetail({
  params
}: {
  params: { id: string[] }
}) {
  const id = (await params).id
  const p = await getProduct(id[1])
//const pcart = await getProductOfCart(id[1])

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <Galeries p={p} />

      <div>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{p.title}</h2>
            <p className="text-slate-600">{p.brand} · {p.category}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-extrabold">{currency(p.price)}</div>
            <div className="text-sm text-slate-500">{p.stock} en stock</div>
          </div>
        </div>

        <div className="mt-4 space-y-3 mb-2">
          <div >
            <div className="text-sm text-slate-600 mb-1">Colors</div>
            <div className="flex flex-wrap gap-2">
              {p.variants.color.map((color:string) => (
                <button key={color}
                  //onClick={() => setSel((s) => ({ ...s, [name]: opt }))} 
                  className={cls("px-3 py-1.5 rounded-xl border",
                    // sel[name] === opt ? "bg-slate-900 text-white" : "bg-white"
                  )}>{color}</button>
              ))}

            </div>
          </div>
          <div >
            <div className="text-sm text-slate-600 mb-1">Size</div>
            <div className="flex flex-wrap gap-2">
              {p.variants.size.map((s:string) => (
                <button key={s}
                  //onClick={() => setSel((s) => ({ ...s, [name]: opt }))} 
                  className={cls("px-3 py-1.5 rounded-xl border",
                    // sel[name] === opt ? "bg-slate-900 text-white" : "bg-white"
                  )}>{s}</button>
              ))}

            </div>
          </div>
        </div>

       {/* <CartItemControls productId={p._id} quantity={pcart?.quantity ? pcart.quantity:0}/> */}


        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <BtnAdd p={p}/>
          <button
            //onClick={() => onBuyNow(p, sel, qty)} 
            className="px-5 py-3 rounded-2xl border flex items-center justify-center gap-2">
               <CreditCard className="w-5 h-5" /> Acheter maintenant</button>
        </div>

        <div className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-2xl border p-3 flex items-center gap-2"><Truck className="w-4 h-4" /> Livraison 48h</div>
          <div className="rounded-2xl border p-3 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Garantie 2 ans</div>
          <div className="rounded-2xl border p-3 flex items-center gap-2"><Package className="w-4 h-4" /> Retours 30 jours</div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-2">Description</h4>
          <p className="text-slate-700 leading-relaxed">{p.description}</p>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-2">Avis ({p.reviews})</h4>
          <div className="rounded-2xl border p-4">
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i}
                  className={cls("w-4 h-4", i < Math.round(p.rating) ? "fill-current" : "opacity-30")} />
              ))}
              <span className="ml-2 text-sm text-slate-600">{p.rating} / 5</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">Les avis détaillés seraient récupérés via API (ex: /products/:id/reviews).</p>
          </div>
        </div>
      </div>
    </section>
  );
}
