import { Request, Response } from "express";
import {
  createProjectService,
  deleteProjectService,
  getAllPorjectsService,
  getProjectByIdService,
  updateProjectService,
} from "../services/projectService";

export const createProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      res.status(400).json({
        message: "Name and description are required",
      });
      return;
    }

    const project = await createProjectService(name, description);

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to create project",
    });
  }
};

export const getAllProjects = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = String(req.query.search || "");

    if (page < 1 || limit < 1) {
      res.status(200).json({
        message: "Page and limit must be greater than 0",
      });
      return;
    }

    const result = await getAllPorjectsService(page, limit, search);

    const totalPages = Math.ceil(result.totalProjects / limit);

    res.status(200).json({
      projects: result.project,
      pagination: {
        currentPage: page,
        limit,
        totalProjects: result.totalProjects,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Failed to get projects:", error);
    res.status(500).json({
      message: "Failed to get projects",
    });
  }
};

export const getprojectById = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await getProjectByIdService(id);
    if (!project) {
      res.status(404).json({
        message: "Project not found",
      });
      return;
    }
    res.status(200).json({
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get project",
    });
  }
};

export const updateProject = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;

    const project = await updateProjectService(id, name, description);
    if (!project) {
      res.status(404).json({
        message: "Project not found",
      });
      return;
    }
    res.status(200).json({
      message: "Project updated Succesfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update project",
    });
  }
};

export const deleteProject = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await deleteProjectService(id);

    if (!project) {
      res.status(404).json({
        message: "Project not found",
      });
      return;
    }
    res.status(200).json({
      message: "project deleted succesfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete project" });
  }
};
