import { Card } from "@/components/Card";
import { UiShipping } from "@/components/Shipping";

export default function Shipping() {
    return (
        <Card title="Mode de livraison">
        <UiShipping shipping={0}/>
        </Card>
    )
}