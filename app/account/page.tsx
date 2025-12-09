import { Card } from "@/components/Card";
import { getUser } from "@/db/controllers/user.controller";

export default async function Page() {
    const user = await getUser()
    return <Card title="Profil">
        <div className="text-sm text-slate-700 space-y-1">
            <div><span className="font-medium">Nom : </span> {user?.firstName} {user?.lastName}</div>
            <div><span className="font-medium">Email : </span> {user?.email}</div>
        </div>
    </Card>
}