'use client'
import { currency } from "@/utils";
import { Filter, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchFilter() {

    const CATEGORIES = ["All", "Shoes", "Apparel", "Bags", "Wearables"];

    const pathname = usePathname()
    const { replace } = useRouter()
    const searchParams = useSearchParams()
    const [formData, setFormData] = useState({
        query: searchParams.get('query') || '',
        category: searchParams.get('category') || 'All',
        priceMax: Number(searchParams.get('priceMax')) || 300,
        sort: searchParams.get('sort') || 'featured'

    })
    const handlChange = () => {
        const params = new URLSearchParams(searchParams)
        if (formData.query) params.set('query', formData.query)
        else params.delete('query')
        if (formData.category) params.set('category', formData.category)
        else params.delete('category')
        if (formData.priceMax) params.set('priceMax', (formData.priceMax).toString())
        else params.delete('priceMax')
        if (formData.sort) params.set('sort', formData.sort)
        else params.delete('sort')
        replace(`${pathname}?${params.toString()}`)

    }
useEffect(()=>{
    handlChange()
},[formData])
    return <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 opacity-60" />
            <input
                defaultValue={formData.query}
                onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                placeholder="Rechercher..."
                className="rounded-xl border border-slate-300 pl-9 pr-3 py-2"
            />
        </div>

        <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 opacity-70" />
            <select
                defaultValue={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="rounded-xl border border-slate-300 px-3 py-2">
                {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                ))}
            </select>
            <input
                type="range"
                min={10}
                max={300}
                step={10}
                value={formData.priceMax}
                onChange={(e) => setFormData({ ...formData, priceMax: Number(e.target.value) })}
            />
            <span className="text-sm text-slate-600">≤ {currency(formData.priceMax)}</span>
            <select
                value={formData.sort}
                onChange={(e) => setFormData({ ...formData, sort: e.target.value })}
                className="rounded-xl border border-slate-300 px-3 py-2">
                <option value="featured">Pertinence</option>
                <option value="price-asc">Prix: croissant</option>
                <option value="price-desc">Prix: décroissant</option>
                <option value="rating">Mieux notés</option>
            </select>
        </div>
    </div>
}