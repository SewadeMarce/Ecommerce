import { Hero } from '@/components/Hero';
import ListProducts from '@/components/ListProducts';
import { SearchFilter } from '@/components/SearchFilter';
import { getProducts } from '@/db/controllers/ecommerce.controller';
import { getOrder } from '@/db/controllers/order.controller';

export default async function Home() {
  const products = await getProducts()

  return (
    <div>
     <Hero />
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
             <div>
               <h2 className="text-2xl font-bold">Catalogue</h2>
               <p className="text-slate-600">{products.length} produits trouvés</p>
             </div>
            <SearchFilter />
           </div>
     
         <ListProducts />
    </div>
  );
}
