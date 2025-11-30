import { CheckCircle2 } from "lucide-react";
import Link from "next/link";


export default async function Page({
  params
}:{
  params:{id:string}
}) {
  const id = (await params).id
  return (
    <section className="max-w-2xl mx-auto text-center py-16">
      <CheckCircle2 className="w-16 h-16 mx-auto text-green-600" />
      <h2 className="mt-4 text-2xl font-bold">Merci pour votre commande !</h2>
      <p className="text-slate-600 mt-1">Numéro de commande <span className="font-mono">{id}</span></p>
      <div className="mt-6 flex gap-3 justify-center">
        <Link href={'/'} className="px-5 py-3 rounded-2xl bg-slate-900 text-white">Voir mes commandes</Link >
        <Link  href={'/'} className="px-5 py-3 rounded-2xl border">Retour à l&#39;accueil</Link >
      </div>
    </section>
  );
}
