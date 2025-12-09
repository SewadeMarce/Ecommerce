import Adresse from "@/app/checkout/page";
import { Card } from "@/components/Card";
import { getUser } from "@/db/controllers/user.controller";
import { IAddress } from "@/db/models/Order";

export default async function Page() {
const user = await getUser() ;
const addresses = user.addresses || []
    return <Card title="Mes adresses">
        <div className="grid sm:grid-cols-2 gap-3">
            {addresses?.map((a:IAddress) => (
                <div key={(a._id).toString()} className="rounded-2xl border p-3">
                    <div className="font-semibold">{a.name}</div>
                    <div className="text-sm text-slate-600">{a.line1}, {a.city}, {a.country}</div>
                    <div className="text-sm text-slate-600">{a.phone}</div>
                </div>
            ))}
            {addresses?.length === 0 && <div className="text-sm text-slate-600">Aucune adresse enregistrée.</div>}
        </div>
    </Card>

}