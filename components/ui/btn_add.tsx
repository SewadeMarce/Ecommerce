'use client'
import { addItem } from "@/db/controllers/cart.controller";
import { ITProducts } from "@/db/models/Product";
import { ShoppingCart } from "lucide-react";
import { useTransition } from "react";

export function BtnAdd({
    p
}: {
    p: ITProducts
}) {
    const [pending, startTransition] = useTransition();
    const handleAddToCart = () => {
        startTransition(async () => {
            try {

                await addItem(p._id, p.price);
                console.log('Produit ajouté');

            } catch (err) {
                console.error("erreor lors de l'ajout", err);
                return
            }
        });
    };

    return <button
        onClick={handleAddToCart}
        disabled={pending}
        className="px-5 py-3 cursor-pointer rounded-2xl bg-slate-900 text-white flex items-center justify-center gap-2 shadow">
        <ShoppingCart className="w-5 h-5" />
        {pending ? 'Ajout...' : 'Ajouter au panier'}
    </button>

}