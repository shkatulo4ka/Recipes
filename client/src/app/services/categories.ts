import { Category } from "@prisma/client";
import { api } from "./api";

export const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoriesApi;

export const {
  endpoints: { getAllCategories },
} = categoriesApi;
