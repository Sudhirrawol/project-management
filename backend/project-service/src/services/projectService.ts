import Project from "../models/project";
import redisClient from "../config/redis";
import { clearCachePattern } from "../utils/cache";

export const createProjectService = async (
  name: string,
  description: string,
) => {
  const project = Project.create({
    name,
    description,
  });
  return project;
};

export const getAllPorjectsService = async (
  page: number,
  limit: number,
  search: string,
) => {
  const skip = (page - 1) * limit;

  const filter = {
    name: {
      $regex: search,
      $options: "i",
    },
  };

  const cacheKey = `projects:${page}:${limit}:${search}`;

  console.log("Checking Redis", cacheKey);

  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    console.log("Cache Hit");
    return JSON.parse(cachedData);
  }
  console.log("Cache Miss");
  const project = await Project.find(filter).skip(skip).limit(limit);

  const totalProjects = await Project.countDocuments(filter);

  const result = { project, totalProjects };

  await redisClient.set(cacheKey, JSON.stringify(result), {
    expiration: {
      type: "EX",
      value: 60, //TTl time to live after ceratin time the expires after some time
    },
  });
  // cache invalidation means deleting cache data when the original database data chnages
  console.log("Data saved in Redis");
  // await clearCachePattern("projects:*");
  return result;
};

export const getProjectByIdService = async (id: string) => {
  const project = await Project.findById(id);
  return project;
};

export const updateProjectService = async (
  id: String,
  name: string,
  description: string,
) => {
  const project = await Project.findByIdAndUpdate(
    id,
    { name, description },
    {
      returnDocument: "after",
    },
  );
  await clearCachePattern("projects:*");
  return project;
};

export const deleteProjectService = async (id: string) => {
  const project = await Project.findByIdAndDelete(id);
  await clearCachePattern("projects:*");
  return project;
};
