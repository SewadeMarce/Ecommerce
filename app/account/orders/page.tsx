import { Card } from "@/components/Card";
import { getOrder } from "@/db/controllers/order.controller";
import { ITOrder } from "@/db/models/Order";
import { currency } from "@/utils";

export default async function Page() {
    const orders = await getOrder()
    return <Card title="Mes commandes">
        {orders.length === 0 ? (
            <div className="text-sm text-slate-600">Aucune commande pour le moment.</div>
        ) : (
            <div className="space-y-3">
                {orders.map((o:ITOrder) => (
                    <div key={(o._id).toString()} className="rounded-2xl border p-3">
                        <div className="flex items-center justify-between text-sm">
                            <div className="font-semibold">{(o._id).toString()}</div>
                            <div className="text-slate-600">{new Date(o.createdAt).toLocaleString()}</div>
                        </div>
                        <div className="mt-2 text-sm text-slate-700">Total: {currency(o.total)} — {o.items.length} article(s) — {o.status}</div>
                    </div>
                ))}
            </div>
        )}
    </Card>
}