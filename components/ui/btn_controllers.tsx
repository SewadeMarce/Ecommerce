

'use client';

import { removeItem, updateItemQuantity } from "@/db/controllers/cart.controller";
import { Minus, Plus, Trash } from "lucide-react";
import mongoose from "mongoose";
import { useTransition } from "react";
// Assurez-vous d'importer vos actions depuis le bon fichier
//import { updateQuantityAction, removeFromCartAction } from "@/actions/cart";
//import { Trash2, Minus, Plus } from "lucide-react";  Optionnel: icônes (npm i lucide-react)

interface CartItemControlsProps {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export default function CartItemControls({ productId, quantity = 0, }: CartItemControlsProps) {
  const [pending, startTransition] = useTransition();

  const handleUpdate = (newQuantity: number) => {
    //  On enveloppe l'appel serveur dans startTransition
    startTransition(async () => {
      //     Optimisation : Si l'utilisateur clique frénétiquement, Next.js gère la file d'attente
      try {
        const state = await updateItemQuantity(productId, newQuantity);
        console.log({ state });

      } catch (error) {
        console.error('erreur lors de la modification du quantité',error);
      }
    });
  };

  const handleRemove = () => {
    startTransition(async () => {
      try {
        const state = await removeItem(productId);
        console.log({ state });

      } catch (error) {
        console.error('erreur lors de la modification du quantité',error);

      }
    });
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => handleUpdate(quantity - 1)}
        disabled={pending || quantity <= 1}
        className="p-1 rounded border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Diminuer la quantité"
      >
        <Minus size={16} />
      </button>

      <span className={`font-medium w-6 text-center ${pending ? 'opacity-50' : ''}`}>
        {quantity}
      </span>

      <button
        onClick={() => handleUpdate(quantity + 1)}
        disabled={pending}
        className="p-1 rounded border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Augmenter la quantité"
      >
        <Plus size={16} />
      </button>

      <div className="h-4 w-px bg-gray-300 mx-2"></div>

      <button
        onClick={handleRemove}
        disabled={pending}
        className="text-red-500 hover:text-red-700 disabled:opacity-50 p-1"
        aria-label="Supprimer du panier"
      >
        {pending ? (
          <span className="text-xs">...</span>
        ) : (
          <Trash size={18} />
        )}
      </button>
    </div>
  );
}