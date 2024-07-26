import { configureStore, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const todoSlice = createSlice({
  name: "todo",
  initialState: ["fazer cafe", "Estudar redux", "Comer um pouco"],
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
