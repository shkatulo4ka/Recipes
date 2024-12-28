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

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Recipes/>
  },
  {
    path: Paths.login,
    element: <Login/>
  },
  {
    path: Paths.register,
    element: <Register />
  },
  {
    path: Paths.ingredient,
    element: <Ingredients />
  }
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
