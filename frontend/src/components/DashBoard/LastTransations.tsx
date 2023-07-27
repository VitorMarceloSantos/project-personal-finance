import { useMemo } from 'react';
import { TransationsData } from '../../data/TransationsData';
import { Link } from 'react-router-dom';
import { LastTransationsCard } from './LastTransationsCard';

export const LastTransations = () => {
	// Vai ser exibido as ultimas transações
	const TransationsDataReverse = [...TransationsData].reverse();
	return (
		<section>
			<h1>Ultimas Transações</h1>
			<ul>
				{useMemo(
					() =>
						TransationsData.length !== 0 ? (
							TransationsDataReverse.slice(0, 4).map((transation, index) => (
								<li key={index} className='Transation-card-dashboard'>
									<LastTransationsCard transation={transation} />
								</li>
							))
						) : (
							<h2>Não há transações cadastradas.</h2>
						),
					[TransationsData],
				)}
			</ul>
			<Link to={'/transacoes'}>Mais ....</Link>
		</section>
	);
};
