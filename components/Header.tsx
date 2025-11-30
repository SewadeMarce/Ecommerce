import { getCart } from "@/db/controllers/cart.controller";
import { TopBar } from "./TopBar";

export default async function Header() {
const cart =    await getCart()
 const user = false || {
    name:'Marce'
   }
    return <TopBar cart={cart} user={user} />
    
}