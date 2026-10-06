// create slice:
// redux toolkit function used to create
// redux state
// reducer fucntions
// action reducers

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  role: string;
}

const initialState: UserState = {
  name: "",
  role: "",
};
const userSlice = createSlice({
  //       Name of this Redux slice.
  //   Redux uses this when generating action names.
  //   Example generated action type:
  // "user/setUser"
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string; role: string }>) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
    },
    clearUser: (state) => {
      state.name = "";
      state.role = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
