import { Stepper } from "@/components/Stepper";
import { Summary } from "@/components/Summary";
import { ReactNode } from "react";

export default function Checkout({
  children
}: {
  children: ReactNode
}

) {



  return (
    <section className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Stepper />
        {children}
        {/*Auth + Address */}
        {/* <div className="space-y-6">
            {!user.loggedIn ? (
              <Card title="Connexion rapide">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    const email = fd.get("email");
                    const name = (fd.get("name") || "Client").toString();
                    onLogin(email, name);
                  }}
                  className="grid sm:grid-cols-2 gap-3"
                >
                  <input name="name" placeholder="Nom" className="rounded-xl border px-3 py-2" />
                  <input required name="email" type="email" placeholder="Email" className="rounded-xl border px-3 py-2" />
                  <button className="sm:col-span-2 px-5 py-3 rounded-2xl bg-slate-900 text-white">Se connecter / Continuer</button>
                </form>
              </Card>
            ) : (
              <Card title={`Bonjour, ${user.name}`}>Vous êtes connecté avec {user.email}.</Card>
            )}

            <Card title="Adresse de livraison">
              <form onSubmit={handleAddAddress} className="grid sm:grid-cols-2 gap-3">
                <input name="name" placeholder="Nom complet" className="rounded-xl border px-3 py-2" required />
                <input name="phone" placeholder="Téléphone" className="rounded-xl border px-3 py-2" required />
                <input name="line1" placeholder="Adresse" className="sm:col-span-2 rounded-xl border px-3 py-2" required />
                <input name="city" placeholder="Ville" className="rounded-xl border px-3 py-2" required />
                <input name="country" placeholder="Pays" className="rounded-xl border px-3 py-2" required />
                <button className="sm:col-span-2 px-5 py-3 rounded-2xl border">Ajouter l'adresse</button>
              </form>

              {addresses.length > 0 && (
                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                  {addresses.map((a) => (
                    <div key={a.id} className="rounded-2xl border p-3 flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-1" />
                      <div className="flex-1 text-sm">
                        <div className="font-semibold">{a.name}</div>
                        <div className="text-slate-600">{a.line1}, {a.city}, {a.country}</div>
                        <div className="text-slate-600">{a.phone}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <button onClick={() => setStep(1)} className="px-5 py-3 rounded-2xl bg-slate-900 text-white">Continuer</button>
                <button onClick={onBack} className="px-5 py-3 rounded-2xl border">Retour au shop</button>
              </div>
            </Card>
          </div> */}

        {/* Step 1: Shipping */}
        {/* {step === 1 && (
          <Card title="Mode de livraison">
            <div className="grid sm:grid-cols-2 gap-3">
              <label className={cls("rounded-2xl border p-4 cursor-pointer", shipMethod === "standard" && "ring-2 ring-slate-900")}> <input className="hidden" type="radio" name="ship" onChange={() => setShipMethod("standard")} checked={shipMethod === "standard"} /> Standard (48-72h) — {shipping === 0 ? "Offert" : currency(shipping)} </label>
              <label className={cls("rounded-2xl border p-4 cursor-pointer", shipMethod === "express" && "ring-2 ring-slate-900")}> <input className="hidden" type="radio" name="ship" onChange={() => setShipMethod("express")} checked={shipMethod === "express"} /> Express (24h) — {currency(14.9)} </label>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => setStep(2)} className="px-5 py-3 rounded-2xl bg-slate-900 text-white">Continuer</button>
              <button onClick={() => setStep(0)} className="px-5 py-3 rounded-2xl border">Retour</button>
            </div>
          </Card>
        )} */}

        {/* Step 2: Payment */}
        {/* {step === 2 && (
          <Card title="Paiement sécurisé">
            <div className="grid sm:grid-cols-2 gap-3">
              <input placeholder="Titulaire de la carte" className="rounded-xl border px-3 py-2" />
              <input placeholder="Numéro de carte" className="rounded-xl border px-3 py-2" />
              <input placeholder="MM/AA" className="rounded-xl border px-3 py-2" />
              <input placeholder="CVC" className="rounded-xl border px-3 py-2" />
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-600"><ShieldCheck className="w-4 h-4" /> Vos données ne sont pas réellement transmises — démo frontend.</div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => onPay("card")} className="px-5 py-3 rounded-2xl bg-slate-900 text-white flex items-center gap-2"><CreditCard className="w-5 h-5" /> Payer {currency(total)}</button>
              <button onClick={() => setStep(1)} className="px-5 py-3 rounded-2xl border">Retour</button>
            </div>
          </Card>
        )} */}
      </div>

      {/* Summary */}
    <Summary />
    </section>
  );
}