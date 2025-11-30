import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI!

if (!MONGO_URI) throw new Error('Veuillez définire MONGO_URI dans .env')
interface MongooseCache {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
}
declare global {
    var mongoose: MongooseCache
}
const cached: MongooseCache = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) global.mongoose = cached

export async function connectDB() {

    if (cached.conn) return cached.conn
    if (!cached.promise) {
        const opts = { bufferCommands: false }
         cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connectée avec succès')
      return mongoose
    })
    }
    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        console.log('Error lors de connection a la db ', error);

        throw error
    }
}