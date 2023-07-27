import { Outlet } from 'react-router';
import '../src/css/app.css';
import { SideBar } from './components/SideBar/SideBar';
import { LoginProvider } from './Context/LoginProvider';

function App() {
	return (
		<>
			<LoginProvider>
				<SideBar>
					<Outlet />
				</SideBar>
			</LoginProvider>
		</>
	);
}

export default App;
