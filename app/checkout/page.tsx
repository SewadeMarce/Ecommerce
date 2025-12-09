import { Card } from "@/components/Card";
import { FormConnect } from "@/components/FormConnect";
import { FormAdress } from "@/components/FormAdress";
import { getUser } from "@/db/controllers/user.controller";

export default  async function Adresse() {
const user = await getUser()

    return <div className="space-y-6">
            {!user ? (
              <FormConnect />
            ) : (
              <Card title={`Bonjour, ${user.firstName}`}>Vous êtes connecté avec {user.email}.</Card>
            )}

            <Card title="Adresse de livraison">
            <FormAdress />

            </Card>
          </div>
    
}