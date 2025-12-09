'use client'
import { ITProducts } from "@/db/models/Product";
import { cls } from "@/utils";
import { ChevronLeft, Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function Galeries({
    p
}:{
    p:ITProducts
}) {
    const [imgIndex,setImgIndex] = useState(0)

    return <div>
            <div className="relative rounded-3xl overflow-hidden border">
              <Image src={`/images/${p.images[imgIndex]}`} alt={p.title}
                width={420} height={420}
                className="w-full h-[420px] object-cover" />
              <button
              disabled={imgIndex == 0}
                onClick={() =>setImgIndex(prev => prev -1 )} 
                className="absolute top-3 left-3 p-2 cursor-pointer rounded-full bg-white/80 backdrop-blur">
                    <ChevronLeft className="w-5 h-5" /></button>
              <button
                //onClick={() => onToggleFav(p.id)} 
                className={cls("absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur",
                  // favorites.includes(p.id) && "text-rose-600"
                )
                }>
                <Heart className="w-5 h-5" /> </button>
            </div>
            <div className="flex gap-2 mt-2">
              {p.images.map((src: string, i: number) => (
                <button key={i}
                  //
                  onClick={() => setImgIndex(i)}
                  className={cls("w-20 h-16 rounded-xl overflow-hidden border cursor-pointer",i === imgIndex ? "ring-2 ring-slate-900":""
                  )}>
                  <Image src={`/images/${src}`} alt="thumb" width={20} height={16} className="w-full h-full object-cover" 
                   />
                </button>
              ))}
            </div>
          </div>
}