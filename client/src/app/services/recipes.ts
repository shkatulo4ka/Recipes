import { Recipe } from '@prisma/client';
import { api } from './api';
import { addEmitHelper } from 'typescript';

export type RecipeData = {
    name: string;
    description: string | null;
    kkal: number | null;
};

export const recipesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllRecipes: builder.query<Recipe[], void>({
            query: () => ({
                url: "/recipes",
                method: 'GET'
            })
        }),
        getRecipe: builder.query<Recipe, string>({
            query: (id) => ({
                url: `/recipes/${id}`,
                method: 'GET'
            })
        }),
        editRecipe: builder.mutation<string, Recipe>({
            query: (recipe) => ({
                url: `/recipes/edit/${recipe.id}`,
                method: 'PUT'
            })
        }),
        deleteRecipe: builder.mutation<string, string>({
            query: (id) => ({
                url: `/recipes/delete/${id}`,
                method: 'POST',
                body: { id }
            })
        }),
        addRecipe: builder.mutation<Recipe, RecipeData>({
            query: (recipe) => ({
                url: `/recipes/add`,
                method: 'POST',
                body: recipe
            })
        })
    })
})

export const { 
    useGetAllRecipesQuery, 
    useGetRecipeQuery,
    useEditRecipeMutation, 
    useDeleteRecipeMutation,
    useAddRecipeMutation
} = recipesApi;

export const {
    endpoints: {
        getAllRecipes,
        getRecipe,
        editRecipe,
        deleteRecipe,
        addRecipe
    }
} = recipesApi;