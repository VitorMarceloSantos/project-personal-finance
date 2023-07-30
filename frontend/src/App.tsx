import { Outlet } from 'react-router';
import '../src/css/app.css';
import { SideBar } from './components/SideBar/SideBar';
import { LoginProvider } from './Context/LoginProvider';
// import { useContext } from 'react';
// import { ThemeContext } from './Context/ThemeContext';

function App() {
	// const { state } = useContext(ThemeContext);
	return (
		<>
			<LoginProvider>
				<SideBar>
					{/* <div className={state}> */}
						{/* <p>{console.log(`State: ${state}`)}</p> */}
						<Outlet />
					{/* </div> */}
				</SideBar>
			</LoginProvider>
		</>
	);
}

export default App;
