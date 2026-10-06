import React, { useState, useRef, useCallback, useReducer } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProjects,
  createProjects,
  updateProjects,
  deleteProject,
} from "./api/project.api";

import {
  projectFormReducer,
  initialState,
} from "./reducers/projectFormReducer";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "./store/userSlice";

import type { AppDispatch, RootState } from "./store/store";

import { useDebounce } from "./hooks/useDebounce";
import ProjectFrom from "./components/ProjectForm";
import ProjectSearch from "./components/ProjectSearch";
import Pagination from "./components/Pagination";
import ProjectList from "./components/ProjectList";
import { AuthProvider } from "./context/AuthContext";

interface projectAppProps {
  accessToken: string | null;
}

function ProjectApp({ accessToken }: projectAppProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [formState, dispatch] = useReducer(projectFormReducer, initialState);
  const debouncedSearch = useDebounce(search, 500);

  const reduxDispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  const { data, isLoading, error } = useQuery({
    queryKey: ["projects", page, debouncedSearch],
    queryFn: () => getProjects(page, debouncedSearch, accessToken),
    enabled: !!accessToken,
  });
  const projectFromApi = data?.projects ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  const queryClient = useQueryClient();

  const createMutataion = useMutation({
    mutationFn: () =>
      createProjects(formState.name, formState.description, accessToken),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      dispatch({ type: "RESET" });
    },
  });
  const updateMutation = useMutation({
    mutationFn: () =>
      updateProjects(
        formState.editingId!,
        formState.name,
        formState.description,
        accessToken,
      ),
    onSuccess: () => {
      (queryClient.invalidateQueries({
        queryKey: ["projects"],
      }),
        dispatch({ type: "RESET" }));
    },
  });
  const deleteMutataion = useMutation({
    mutationFn: (id: string) => deleteProject(id, accessToken),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      }),
  });
  const handleDelete = useCallback((id: string) => {
    deleteMutataion.mutate(id);
  }, []);

  const handleSetUser = () => {
    reduxDispatch(setUser({ name: "sam", role: "admin" }));
  };

  const handleEdit = useCallback(
    (id: string, projectName: string, projectDescription: string) => {
      dispatch({
        type: "SET_EDITING_ID",
        payload: id,
      });
      dispatch({
        type: "SET_NAME",
        payload: projectName,
      });
      dispatch({
        type: "SET_DESCRIPTION",
        payload: projectDescription,
      });
      nameInputRef.current?.focus();
    },
    [],
  );

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.description.trim()) {
      dispatch({
        type: "SET_ERROR",
        payload: "Name and Description are required",
      });
      return;
    }
    dispatch({ type: "SET_ERROR", payload: "" });

    // editing
    if (formState.editingId !== null) {
      updateMutation.mutate();
      return;
    }

    createMutataion.mutate();
  };

  return (
    <AuthProvider accessToken={accessToken}>
      <div>
        <h1>Project Managment</h1>
        <h3>User : {user.name}</h3>
        <p>Role: {user.role}</p>
        <button onClick={handleSetUser}>Set Redux user</button>
        <ProjectFrom
          name={formState.name}
          description={formState.description}
          error={formState.error}
          editingId={formState.editingId}
          nameInputRef={nameInputRef}
          onNameChange={(value) =>
            dispatch({ type: "SET_NAME", payload: value })
          }
          onDescriptionChange={(value) =>
            dispatch({ type: "SET_DESCRIPTION", payload: value })
          }
          onSubmit={handleSubmit}
        />
        <ProjectSearch
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
        <h2>Projects</h2>
        {isLoading && <p>Loading projects...</p>}
        {error && <p>Unable to load Projects</p>}
        <ProjectList
          projects={projectFromApi}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          onPrevious={() => setPage(page - 1)}
          onNext={() => setPage(page + 1)}
        />
      </div>
    </AuthProvider>
  );
}

export default ProjectApp;
