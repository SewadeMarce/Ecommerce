import { getCart } from "@/db/controllers/cart.controller";
import { TopBar } from "./TopBar";
import { getUser } from "@/db/controllers/user.controller";

export default async function Header() {
const cart =    await getCart()
    const user = await getUser()

    return <TopBar cart={cart} user={user} />
    
}