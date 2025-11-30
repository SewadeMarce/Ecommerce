import { ReactNode } from "react";

export function Card({
     title, children 
    }:{
         title:string, children :ReactNode
    }) {
  return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      {title && <h3 className="font-semibold mb-3">{title}</h3>}
      {children}
    </div>
  );
}
