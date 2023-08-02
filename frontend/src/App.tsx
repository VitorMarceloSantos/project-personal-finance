import { Outlet } from 'react-router';
import '../src/css/app.css';
import { SideBar } from './components/SideBar/SideBar';
import { LoginProvider } from './Context/LoginProvider';
import { DrawerProvider } from './Context/DrawerProvider';

function App() {
	return (
		<>
			<LoginProvider>
				<DrawerProvider>
					<SideBar>
						<Outlet />
					</SideBar>
				</DrawerProvider>
			</LoginProvider>
		</>
	);
}

export default App;
