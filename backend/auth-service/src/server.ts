import 'dotenv/config';

import app from './app.js';
import { connectDB } from "./config/db.js"
const PORT = process.env.PORT;

export async function startServer(): Promise<void> {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Auth Service running on port ${PORT}`)
        })
    } catch (error) {
        console.error("failed to start auth service", error)
        process.exit(1)
    }
}

startServer()