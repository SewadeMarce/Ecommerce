'use client'
import { LogOut, Search, Store, User } from "lucide-react";
import Link from "next/link";
import { BtnSidebarCart } from "./btn_cart_sidebar";
import { BtnLogout } from "./ui/btn_logout";
import { CartSheet } from "./CartSheet";
import { useState } from "react";
import { ITCarts } from "@/db/controllers/cart.controller";
import { ITUser } from "@/db/models/User";

// ---------- TopBar ----------
export function TopBar({
  cart, user
}: {
  cart: ITCarts, user: ITUser | undefined

}) {
  // const { user, onLogout, onGoAccount, onGoHome, onOpenCart, cartCount }

  const [onOpenCart, setOnOpenCart] = useState(false)
  return (<>
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href='/home' className="flex items-center gap-2" >
            <Store className="w-6 h-6" />
            <span className="font-bold text-lg">Aether Shop</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="w-5 h-5 absolute left-3 top-2.5 opacity-60" />
              <input
                placeholder="Rechercher des produits..."
                className="w-full rounded-xl border border-slate-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <BtnSidebarCart open={onOpenCart} onClose={setOnOpenCart} cartCount={cart.totalItem} />
            <div className="h-6 w-px bg-slate-200" />
            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:block text-sm">Bonjour, {user?.firstName} {user?.lastName}</span>
                <Link href='/account' className="rounded-xl p-2 hover:bg-slate-100" >
                </Link>
                <BtnLogout>
                  <LogOut className="w-4 h-4" />
                </BtnLogout>
              </div>
            ) : (
              <Link href='/account' className="rounded-xl p-2 hover:bg-slate-100" >
                <User className="w-6 h-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
    <CartSheet open={onOpenCart} onClose={setOnOpenCart} items={cart.items} subtotal={cart.subtotal} discount={cart.discount} taxes={cart.taxes} total={cart.total} shipping={cart.shipping} />
  </>

  );
}