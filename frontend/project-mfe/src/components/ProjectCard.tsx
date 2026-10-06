import React from "react";

type ProjectCardProps = {
  id: string;
  name: string;
  description: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string, description: string) => void;
};

const ProjectCard = ({
  id,
  name,
  description,
  onDelete,
  onEdit,
}: ProjectCardProps) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{description}</p>
      <button onClick={() => onEdit(id, name, description)}>Edit</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default React.memo(ProjectCard);
