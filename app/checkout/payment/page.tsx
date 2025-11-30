import { Card } from "@/components/Card";
import { FormPayment } from "@/components/Payment";

export default function Payment() {

    return <Card title="Paiement sécurisé">
           <FormPayment total={0}/>
          </Card>
}