import express from 'express';
import dotenv from 'dotenv';
import {clerkMiddleware} from '@clerk/express';
import path from 'path';

import { connectDB } from './lib/db.js';

import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';
import adminRoutes from './routes/adminRoute.js';
import songRoutes from './routes/songRoute.js';  
import albumsRoutes from './routes/albumsRoute.js';
import statRoutes from './routes/statRoute.js';
import fileupload from 'express-fileupload';  
import { fileURLToPath } from 'url';


dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(clerkMiddleware());//this will add auth to req object
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, "tmp"),
  createParentPath: true, 
  limits: { fileSize: 50 * 1024 * 1024 },
}));


app.use("/api/users",userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumsRoutes);
app.use("/api/stats", statRoutes);


app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: ProcessingInstruction.env.NODE_ENV === "production" ? "Something went wrong" : err.message });
});

app.listen(PORT, () => {
  console.log("Server is running on port"+PORT);
  connectDB();
});