import { getProducts } from "@/db/controllers/ecommerce.controller";
import { ProductCard } from "./ProductCart";
import { BtnReset } from "./ui/btn_reset";
import { ITProducts } from "@/db/models/Product";

export default async function ListProducts() {
  //const products = await getProducts()
  const products = await getProducts()
  return <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {products.map((p:ITProducts,) => (
        <ProductCard key={(p._id).toString()} p={p} />
      ))}
    </div>

    {products.length === 0 && (
      <div className="text-center py-16 text-slate-600">
        Aucun produit ne correspond à votre recherche.
        <div className="mt-4">
          <BtnReset />
        </div>
      </div>
    )}
  </>


}