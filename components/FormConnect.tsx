'use client'
import { useActionState, useState } from "react";
import { Card } from "./Card";
import { authUser } from "@/db/controllers/user.controller";

export function FormConnect() {
  const [isLogin, setIsLogin] = useState(true);
  const [state, action, pending] = useActionState<{ success: false, message: string } | undefined, FormData>(authUser, undefined)

  return <Card title={isLogin ? "Connexion" : "Inscription"}>

    <form action={action}

      className="grid sm:grid-cols-2 gap-3"
    >
      {!isLogin &&
        <>
          <input name="firstName" required placeholder="Fisrt Name" className="rounded-xl border px-3 py-2" />
          <input name="lastName" required placeholder="Last Name" className="rounded-xl border px-3 py-2" />
          <input name="register" hidden value="register" className="rounded-xl border px-3 py-2" />
        </>
        }
      <input required name="email" type="email" placeholder="Email" className="rounded-xl border px-3 py-2" />
      <input required name="password" type="password" placeholder="password" className="rounded-xl border px-3 py-2" />
      <button className="sm:col-span-2 px-5 py-3 rounded-2xl bg-slate-900 text-white">
        {pending ? "Traitement..." : !isLogin ? " S'inscrire " : "Se connecter"}
      </button>
    </form>
    <p className="text-center py-5">{isLogin ? "Vous n'avez pas de compte " : "Vous aveez déja un compte"}?
      <button onClick={() => setIsLogin(!isLogin)} className="rounded-2xl text-2xl cursor-pointer text-slate-900 bg-white p-3">
        {isLogin ? " S'inscrire " : "Se connecter"}
      </button>
    </p>
  </Card>

}