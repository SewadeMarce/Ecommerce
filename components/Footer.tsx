export function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-sm text-slate-600 grid md:grid-cols-4 gap-6">
        <div>
          <div className="font-bold text-slate-900">Aether Shop</div>
          <p className="mt-2">Boutique démo React + Tailwind. Paiement simulé pour la démonstration.</p>
        </div>
        <div>
          <div className="font-semibold">Aide</div>
          <ul className="mt-2 space-y-1">
            <li>Livraison</li>
            <li>Retours</li>
            <li>Suivi de commande</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Légal</div>
          <ul className="mt-2 space-y-1">
            <li>Conditions</li>
            <li>Confidentialité</li>
            <li>Cookies</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Newsletter</div>
          <div className="mt-2 flex">
            <input placeholder="Votre email" className="flex-1 rounded-l-xl border px-3 py-2" />
            <button className="px-4 py-2 rounded-r-xl bg-slate-900 text-white">OK</button>
          </div>
        </div>
      </div>
    </footer>
  );
}