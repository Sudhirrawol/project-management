import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (error) => {
  console.log("Auth redis error", error);
});

export async function connectRedis(): Promise<void> {
  await redisClient.connect();

  console.log("Auth Service Redis Connected");
}

export default connectRedis;
