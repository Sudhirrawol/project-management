interface ProjectSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
}

function ProjectSearch({ search, onSearchChange }: ProjectSearchProps) {
  return (
    <input
      type="text"
      placeholder="Search projects..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}

export default ProjectSearch;
