import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGODB_URI;

        if (!MONGO_URI) {
            throw new Error('MONGODB_URI is not defined');
        }

        await mongoose.connect(MONGO_URI);

        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
