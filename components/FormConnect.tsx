import { Card } from "./Card";

export function FormConnect() {

    return  <Card title="Connexion rapide">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    const email = fd.get("email");
                    const name = (fd.get("name") || "Client").toString();
                   // onLogin(email, name);
                  }}
                  className="grid sm:grid-cols-2 gap-3"
                >
                  <input name="name" placeholder="Nom" className="rounded-xl border px-3 py-2" />
                  <input required name="email" type="email" placeholder="Email" className="rounded-xl border px-3 py-2" />
                  <button className="sm:col-span-2 px-5 py-3 rounded-2xl bg-slate-900 text-white">Se connecter / Continuer</button>
                </form>
              </Card>
    
}