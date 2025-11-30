import { Card } from "@/components/Card";
import { FormConnect } from "@/components/FormConnect";
import { FormAdress } from "@/components/FormAdress";

export default function Adresse() {
const user = {
  name: 'Marce',
  email:'marce@mail.com'
}

    return <div className="space-y-6">
            {!user ? (
              <FormConnect />
            ) : (
              <Card title={`Bonjour, ${user.name}`}>Vous êtes connecté avec {user.email}.</Card>
            )}

            <Card title="Adresse de livraison">
            <FormAdress />

            </Card>
          </div>
    
}