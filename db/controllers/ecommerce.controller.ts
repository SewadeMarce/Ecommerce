'use server'

import { products } from "@/script/seed";
import { connectDB } from "../connection/mongoose";
import Cart from "../models/Cart";
import Product from "../models/Product";
import mongoose from "mongoose";

const MOCK_PRODUCTS = [
  {
    id: "p1",
    title: "Sneakers Nova X",
    brand: "Aether",
    category: "Shoes",
    price: 129.99,
    rating: 4.6,
    reviews: 212,
    badges: ["Best Seller"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1200&auto=format&fit=crop",
    ],
    variants: {
      Color: ["Black", "White", "Volt"],
      Size: ["39", "40", "41", "42", "43", "44"],
    },
    stock: 47,
    description:
      "Baskets légères avec mousse réactive et empeigne respirante. Parfaites pour la ville et le running occasionnel.",
  },
  {
    id: "p2",
    title: "Tee-shirt TechDry",
    brand: "Aether",
    category: "Apparel",
    price: 39.0,
    rating: 4.3,
    reviews: 88,
    badges: ["New"],
    images: [
      "https://images.unsplash.com/photo-1534126511673-b6899657816a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
    ],
    variants: {
      Color: ["Navy", "Charcoal", "Sand"],
      Size: ["S", "M", "L", "XL"],
    },
    stock: 120,
    description: "Tee technique à séchage rapide avec traitement anti-odeurs.",
  },
  {
    id: "p3",
    title: "Sac à dos Metro 24L",
    brand: "Urbanite",
    category: "Bags",
    price: 89.9,
    rating: 4.7,
    reviews: 351,
    badges: ["Eco"],
    images: [
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
    ],
    variants: {
      Color: ["Olive", "Black", "Umber"],
    },
    stock: 25,
    description: "Sac durable en matériaux recyclés avec poche laptop 16"
  },

  {
    id: "p4",
    title: "Montre Pulse Pro",
    brand: "Helios",
    category: "Wearables",
    price: 249.0,
    rating: 4.4,
    reviews: 142,
    badges: ["Limited"],
    images: [
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1200&auto=format&fit=crop",
    ],
    variants: {
      Strap: ["Silicone", "Leather"],
      Color: ["Silver", "Black"],
    },
    stock: 8,
    description: "Suivi cardiaque avancé, GPS, 10 jours d'autonomie.",
  },
];
export async function getProducts() {

  await connectDB()

  const data = await Product.find()
    .select('-__v -createdAt  -updatedAt:')
    .limit(3)
    .lean()


  return JSON.parse(JSON.stringify(data))

}

export async function getProduct(id:string) {
  await connectDB()
  const data = await Product.findById(id)
  
  return JSON.parse(JSON.stringify(data))
}
const CATEGORIES = ["All", "Shoes", "Apparel", "Bags", "Wearables"];




export async function createProducts() {
  await connectDB()
  const data = await Product.create(products)


  return JSON.parse(JSON.stringify(data))

}