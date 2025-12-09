import { Card } from "@/components/Card";

export default function () {

    return <Card title="Favoris">
        <div className="grid sm:grid-cols-2 gap-3">
            {favorites.map((id) => {
                const p = products.find((x) => x.id === id);
                if (!p) return null;
                return (
                    <div key={id} className="rounded-2xl border overflow-hidden">
                        <img src={p.images[0]} alt={p.title} className="w-full h-40 object-cover" />
                        <div className="p-3 flex items-center justify-between">
                            <div>
                                <div className="font-medium">{p.title}</div>
                                <div className="text-sm text-slate-600">{currency(p.price)}</div>
                            </div>
                            <button className="px-3 py-2 rounded-xl border" onClick={() => onOpenProduct(p.id)}>Voir</button>
                        </div>
                    </div>
                );
            })}
            {favorites.length === 0 && <div className="text-sm text-slate-600">Aucun favori.</div>}
        </div>
    </Card>
}