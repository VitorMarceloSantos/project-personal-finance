import { TransationsCardType } from '../../Types/DashBoard/TransationsCardType';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export const LastTransationsCard = ({ transation }: TransationsCardType) => {
	return (
		<>
			{transation.type === 'Receita' ? (
				<TrendingUpIcon sx={{ color: 'green' }} />
			) : (
				<TrendingDownIcon sx={{ color: 'red' }} />
			)}
			<p>{transation.value && transation.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
			<p>{transation.description}</p>
			<p>{transation.category}</p>
		</>
	);
};
