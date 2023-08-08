import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { DashBoard } from './pages/DashBoard.tsx';
import { Categories } from './pages/Categories.tsx';
import { Transations } from './pages/Transations.tsx';
import { Objectives } from './pages/Objectives.tsx';
import { ThemeProvider } from './Context/ThemeProvider.tsx';

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: '/',
				element: <DashBoard />,
			},
			{
				path: '/transacoes',
				element: <Transations />,
			},
			{
				path: '/categorias',
				element: <Categories />,
			},
			{
				path: '/metas',
				element: <Objectives />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		{/* O context foi adicionado nesse lugar para ser utilizado por todos */}
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	</React.StrictMode>,
);
