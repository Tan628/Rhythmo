import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected ${conn.connection.host}');
    } catch (error) {
        console.log('failed to connect MongoDB', error);
        process.exit(1);//1 is failed to connect to the database
    }
}