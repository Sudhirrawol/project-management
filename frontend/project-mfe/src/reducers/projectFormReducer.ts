export interface ProjectFormState {
  // We can describe that shape using an interface:
  //   contract for what an object should look like.
  name: string;
  description: string;
  error: string;
  editingId: string | null;
}

export const initialState: ProjectFormState = {
  name: "",
  description: "",
  error: "",
  editingId: null,
};

export type ProjectFromAction =
  | {
      type: "SET_NAME";
      payload: string;
    }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_EDITING_ID"; payload: string | null }
  | { type: "RESET" };

export function projectFormReducer(
  state: ProjectFormState,
  action: ProjectFromAction,
): ProjectFormState {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "SET_DESCRIPTION":
      return {
        ...state,
        description: action.payload,
      };
    case "SET_EDITING_ID":
      return {
        ...state,
        editingId: action.payload,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}
