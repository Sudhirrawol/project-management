import express from "express";

import {
  createProject,
  deleteProject,
  getAllProjects,
  getprojectById,
  updateProject,
} from "../controllers/ProjectControllers";
import { validateProject } from "../middleware/validateProject";
import { authenticationToken } from "../middleware/auth.middleware";

const router = express.Router();

router.use(authenticationToken);
router.post("/", validateProject, createProject);
router.get("/", getAllProjects);
router.get("/:id", getprojectById);
router.put("/:id", validateProject, updateProject);
router.delete("/:id", deleteProject);

export default router;
