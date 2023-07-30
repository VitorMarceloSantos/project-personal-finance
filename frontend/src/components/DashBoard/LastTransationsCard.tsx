import { TransationsCardType } from '../../Types/DashBoard/TransationsCardType';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export const LastTransationsCard = ({ transation }: TransationsCardType) => {
	return (
		<article className='last-transations-card'>
			{transation.type === 'Receita' ? (
				<TrendingUpIcon sx={{ color: 'green' }} />
			) : (
				<TrendingDownIcon sx={{ color: 'red' }} />
			)}
			<p>{transation.value && transation.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
			<p className='last-transations-card-description'>{transation.description}</p>
			<p>{transation.category}</p>
		</article>
	);
};
