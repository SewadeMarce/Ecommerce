'use client'
import { addItem } from "@/db/controllers/cart.controller";
import { ITProducts } from "@/db/models/Product";
import { cls, currency } from "@/utils";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import {  useTransition } from "react";

export function ProductCard({
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

  return (
    <div className="group rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-4/3 overflow-hidden">
        <img src={`/images/${p.images[0]}`} alt={p.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
        <button
          //onClick={onFav} 
          className={cls("absolute top-3 right-3 rounded-full p-2 backdrop-blur bg-white/80",
            // fav && "text-rose-600"
          )}>
          <Heart className="w-5 h-5" />
        </button>
        <div className="absolute left-3 top-3 flex gap-2">
          {p.badges?.map((b, k) => (
            <span key={k} className="px-2 py-0.5 rounded-full text-xs bg-slate-900/80 text-white">{b}</span>
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold line-clamp-1">{p.title}</h3>
          <span className="font-bold">{currency(p.price)}</span>
        </div>
        <p className="text-sm text-slate-600">{p.brand} · {p.category}</p>
        <div className="flex items-center gap-1 mt-2 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cls("w-4 h-4", i < Math.round(p.rating) ? "fill-current" : "opacity-30")} />
          ))}
          <span className="text-xs text-slate-500 ml-1">({p.reviews})</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Link href={`/detail/${p.title}/${p._id}`}
            className="flex-1 px-4 py-2 rounded-xl bg-slate-900 text-white">Voir
          </Link>

          <button
            onClick={handleAddToCart}
            disabled={pending}
            className="px-3 py-2 rounded-xl border"
          >
            {pending ? 'Ajout...' : 'Ajouter au panier'}
          </button>
        </div>
      </div>
    </div>
  );
}



//   TypeScript
// 'use client' // Nécessaire pour l'interactivité (onClick)

// import { useTransition } from 'react';
// import { addToCartAction } from '@/actions/cart';
// import { toast } from 'react-hot-toast'; // Optionnel pour le feedback

// export default function AddButton({ product }: { product: any }) {
//   let [isPending, startTransition] = useTransition();

//   const handleAddToCart = () => {
//     startTransition(async () => {
//       try {
//         await addToCartAction(product._id, product.price);
//         toast.success("Ajouté au panier !");

//         // Pas besoin de setCart ici ! 
//         // revalidatePath du serveur mettra à jour la UI automatiquement
//         // si vous affichez le panier ailleurs.
//       } catch (err) {
//         toast.error("Erreur serveur");
//       }
//     });
//   };
