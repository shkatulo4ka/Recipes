import { Ingredient } from "@prisma/client";
import { api } from "./api";

export type IngredientData = Omit<Ingredient, "id">;

export const ingredientsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllIngredients: builder.query<Ingredient[], void>({
      query: () => ({
        url: "/ingredients",
        method: "GET",
      }),
    }),
    getIngredient: builder.query<Ingredient, string>({
      query: (id) => ({
        url: `/ingredients/${id}`,
        method: "GET",
      }),
    }),
    editIngredient: builder.mutation<string, Ingredient>({
      query: (ingredient) => ({
        url: `/ingredients/edit/${ingredient.id}`,
        method: "PUT",
      }),
    }),
    deleteIngredient: builder.mutation<string, string>({
      query: (id) => ({
        url: `/ingredients/delete/${id}`,
        method: "POST",
        body: { id },
      }),
    }),
    addIngredient: builder.mutation<Ingredient, IngredientData>({
      query: (ingredient) => ({
        url: `/ingredients`,
        method: "POST",
        body: ingredient,
      }),
    }),
  }),
});

export const {
  useGetAllIngredientsQuery,
  useGetIngredientQuery,
  useEditIngredientMutation,
  useDeleteIngredientMutation,
  useAddIngredientMutation,
} = ingredientsApi;

export const {
  endpoints: { getAllIngredients, getIngredient, editIngredient, deleteIngredient, addIngredient },
} = ingredientsApi;
