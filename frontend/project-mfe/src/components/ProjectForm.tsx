import type React from "react";

interface projectFromProps {
  name: string;
  description: string;
  error: string;
  editingId: string | null;
  nameInputRef: React.RefObject<HTMLInputElement | null>;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: (e: React.SubmitEvent) => void;
}

function ProjectFrom({
  name,
  description,
  error,
  editingId,
  nameInputRef,
  onNameChange,
  onDescriptionChange,
  onSubmit,
}: projectFromProps) {
  return (
    <form onSubmit={onSubmit}>
      <input
        ref={nameInputRef}
        type="text"
        placeholder="Project name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button type="submit">
        {editingId !== null ? "Update Project " : "Create Projects"}
      </button>
    </form>
  );
}

export default ProjectFrom;
