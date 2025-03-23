import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './app/store';
import { Paths } from './paths';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { ConfigProvider, theme } from 'antd';
import Auth from './features/auth/auth';
import Recipes from './pages/recipes/Recipes';
import Ingredients from './pages/ingredients/Ingredients';
import AddIngredient from './pages/AddIngredient/AddIngredient';
import Status from './pages/status/Status';
import AddRecipe from './pages/AddRecipe/AddRecipe';

const router = createBrowserRouter([
  {path: Paths.home, element: <Recipes/>},
  {path: Paths.login,element: <Login/>},
  {path: Paths.register, element: <Register />},
  {path: Paths.ingredient, element: <Ingredients />},
  {path: Paths.ingredientAdd, element: <AddIngredient />},
  {path: `${Paths.status}/:status`, element: <Status />},
  {path: Paths.recipeAdd, element:<AddRecipe/>}
])

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{
        algorithm: theme.darkAlgorithm
      }}>
        <Auth>
          <RouterProvider router={router}/>
        </Auth>
      </ConfigProvider>
     </Provider>
  </React.StrictMode>
);

reportWebVitals();
