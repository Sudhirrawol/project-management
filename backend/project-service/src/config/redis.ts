import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", async (err) => {
  console.error("error", err);
});

export const connectRedis = async () => {
  await redisClient.connect();
  console.log("Redis connected");
};
export default redisClient;
