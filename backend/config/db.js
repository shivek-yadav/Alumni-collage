

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGODB_URI;

        if (!MONGO_URI) {
            throw new Error("❌ MONGODB_URI is not defined in .env file");
        }

        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;

