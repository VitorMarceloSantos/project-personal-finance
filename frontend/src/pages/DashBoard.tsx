// import { useEffect } from 'react';
import AlertDialogSlide from '../components/DashBoard/DialogLocalStorage';
import { useNavigate } from "react-router-dom";
export const DashBoard = () => {
	const navigate = useNavigate();
	return (
		<>
			<h1>DashBoard</h1>
			{!!localStorage.getItem('localTransations') ? <AlertDialogSlide /> : <h1>Chave inexistente</h1>}
			<button type='button' onClick={() => navigate('/transacoes')}>Transacoes</button>
			<button type='button' onClick={() => navigate('/metas')}>Metas</button>
		</>
	);
};
