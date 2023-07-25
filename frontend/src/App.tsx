import { Outlet } from 'react-router';
import '../src/css/app.css';
import { SideBar } from './components/SideBar/SideBar';

function App() {
	return (
		<>
			<SideBar>
				<Outlet />
			</SideBar>
		</>
	);
}

export default App;
