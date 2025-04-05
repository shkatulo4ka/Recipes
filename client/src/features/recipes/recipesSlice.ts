import { Recipe } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { recipesApi } from "../../app/services/recipes";
import { RootState } from "../../app/store";

interface InitialState {
  recipes: Recipe[] | null;
}

const initialState: InitialState = {
  recipes: null,
};

const slice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(recipesApi.endpoints.getAllRecipes.matchFulfilled, (state, action) => {
      state.recipes = action.payload;
    });
  },
});

export default slice.reducer;

export const selectRecipes = (state: RootState) => state.recipes;
