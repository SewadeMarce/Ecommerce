import ListProducts from "@/components/ListProducts";
import { SearchFilter } from "@/components/SearchFilter";
import { getProducts } from "@/db/controllers/ecommerce.controller";
import { ITProducts } from "@/db/models/Product";

export default async function Catalog() {
  const products = await getProducts()
  // const categories = useMemo(() => CATEGORIES, []);
  return (
    <section className="mt-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Catalogue</h2>
          <p className="text-slate-600">{products.length} produits trouvés</p>
        </div>
        <SearchFilter />
      </div>

      <ListProducts />

      <div className="mt-10">
        <h3 className="font-semibold mb-3">Marques mises en avant</h3>
        <div className="flex gap-2 flex-wrap">
          {products.map((p:ITProducts)  => (
            <span key={p.brand} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">{p.brand}</span>
          ))}
        </div>
      </div> 
    </section>
  );
}