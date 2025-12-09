import { Card } from "@/components/Card";
import { FormPayment } from "@/components/Payment";
import { getCart } from "@/db/controllers/cart.controller";

export default async function Payment() {
const {totalAmount} =    await getCart()

    return <Card title="Paiement sécurisé">
           <FormPayment total={totalAmount}/>
          </Card>
}