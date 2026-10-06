export const getProjects = async (
  page: number,
  search: string,
  accessToken: string | null,
) => {
  const response = await fetch(
    `http://localhost:5002/projects?page=${page}&limit=10&search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return response.json();
};

export const createProjects = async (
  name: string,
  description: string,
  accessToken: string | null,
) => {
  const response = await fetch("http://localhost:5002/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ name, description }),
  });
  if (!response.ok) {
    throw new Error("Failed to create projects");
  }
  return response.json();
};

export const updateProjects = async (
  id: string,
  name: string,
  description: string,
  accessToken: string | null,
) => {
  const response = await fetch(`http://localhost:5002/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ name, description }),
  });

  if (!response.ok) {
    throw new Error("failed to update project");
  }
  return response.json();
};

export const deleteProject = async (id: string, accessToken: string | null) => {
  const response = await fetch(`http://localhost:5002/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete project");
  }

  return response.json();
};
