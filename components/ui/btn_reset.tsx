'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const BtnReset = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    function handlChange() {
        const params = new URLSearchParams(searchParams)
        params.delete('query')
        params.set('category', 'All')
        params.set('priceMax', '300')
        params.set('sort', "featured")
        return replace(`${pathname}?${params.toString()}`)
    }
    return <button className="px-4 py-2 rounded-xl border cursor-pointer"
        onClick={() => { handlChange() }}
    >
        Réinitialiser les filtres
    </button>
}