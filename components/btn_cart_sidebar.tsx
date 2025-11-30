'use client'
import { ShoppingCart } from "lucide-react"

export const BtnSidebarCart = ({
    open, onClose,cartCount
}: {
    open: boolean, onClose: (open: boolean) => void,cartCount:number
}) => {
    return <><button
        onClick={(e) => onClose(!open)}
        className="relative rounded-xl p-2 hover:bg-slate-100"
        aria-label="Panier"
    >
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 text-xs bg-slate-900 text-white rounded-full px-1.5 py-0.5">
                {cartCount}
            </span>
        )}
    </button>
    </>
}