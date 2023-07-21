import AlertLocalStorage from '../components/DashBoard/AlertLocalStorage';
import { useNavigate } from 'react-router-dom';

export const DashBoard = () => {
	const navigate = useNavigate();

	return (
		<>
			<h1>DashBoard</h1>
			{!!localStorage.getItem('localTransations') || !!localStorage.getItem('localObjectives') ? (
				<AlertLocalStorage />
			) : (
				<h1>Conteúdo Carregado</h1>
			)}
			<button type='button' onClick={() => navigate('/transacoes')}>
				Transacoes
			</button>
			<button type='button' onClick={() => navigate('/metas')}>
				Metas
			</button>
			<button type='button' onClick={() => navigate('/categorias')}>
				Categorias
			</button>
		</>
	);
};
