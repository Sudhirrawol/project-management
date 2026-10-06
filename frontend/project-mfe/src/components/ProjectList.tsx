import ProjectCard from "./ProjectCard";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface ProjectListProps {
  projects: any[];
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string, description: string) => void;
}

function ProjectList({ projects, onDelete, onEdit }: ProjectListProps) {
  const auth = useContext(AuthContext); //is a react hook used to read data froma a context

  console.log("auth?.accessToken", auth?.accessToken);
  return (
    <>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
          description={project.description}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </>
  );
}

export default ProjectList;
