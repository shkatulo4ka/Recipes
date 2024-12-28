import { Ingredient } from '@prisma/client';
import { api } from './api';
import { addEmitHelper } from 'typescript';

export const ingredientsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllIngredients: builder.query<Ingredient[], void>({
            query: () => ({
                url: "/ingredients",
                method: 'GET'
            })
        }),
        getIngredient: builder.query<Ingredient, string>({
            query: (id) => ({
                url: `/ingredients/${id}`,
                method: 'GET'
            })
        }),
        editIngredient: builder.mutation<string, Ingredient>({
            query: (recipe) => ({
                url: `/ingredients/edit/${recipe.id}`,
                method: 'PUT'
            })
        }),
        deleteIngredient: builder.mutation<string, string>({
            query: (id) => ({
                url: `/ingredients/delete/${id}`,
                method: 'POST',
                body: { id }
            })
        }),
        addIngredient: builder.mutation<Ingredient, Ingredient>({
            query: (ingredient) => ({
                url: `/ingredients/add`,
                method: 'POST',
                body: ingredient
            })
        })
    })
})

export const { 
    useGetAllIngredientsQuery, 
    useGetIngredientQuery,
    useEditIngredientMutation, 
    useDeleteIngredientMutation,
    useAddIngredientMutation
} = ingredientsApi;

export const {
    endpoints: {
        getAllIngredients,
        getIngredient,
        editIngredient,
        deleteIngredient,
        addIngredient
    }
} = ingredientsApi;