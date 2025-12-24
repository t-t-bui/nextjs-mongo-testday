import mongoose from "mongoose"

// Define the connection cache type
type MongooseCache = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

// Extend the global object to include our mongoose cache
declare global {
    let mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

// Initialize the cache on the global object to persist across hot reloads in development
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
    global.mongoose = cached;
} 

export async function connectDB(): Promise<typeof mongoose> {
	if(cached.conn) return cached.conn;

	if(!cached.promise) {
		if (!MONGODB_URI) {
            throw new Error(
                'Please define the MONGODB_URI environment variable inside .env.local'
            );
        }
		const options = {
            bufferCommands: false, // Disable Mongoose buffering
        };

        // Create a new connection promise
        cached.promise = mongoose.connect(MONGODB_URI!, options).then((mongoose) => {
            return mongoose;
        });
    }

    console.log("Connected to MongoDB:", mongoose.connection.name);

    try {
        // Wait for the connection to establish
        cached.conn = await cached.promise;
    } catch (error) {
        // Reset promise on error to allow retry
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}

export default connectDB;