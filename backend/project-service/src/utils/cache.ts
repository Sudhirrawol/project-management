import redisClient from "../config/redis";

export const clearCachePattern = async (pattern: string) => {
  for await (const keys of redisClient.scanIterator({
    MATCH: pattern,
    COUNT: 100,
  })) {
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  }
};

// 500,000 keys
// redisClient.keys("projects:*")
// "Search through the keyspace and give me
// all keys matching projects:*"

// Redis keyspace

// [ keys ][ keys ][ keys ][ keys ][ keys ]
//           ↑
//         cursor
//      "continue around here"
