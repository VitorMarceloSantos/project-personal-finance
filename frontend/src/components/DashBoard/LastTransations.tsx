import { useContext, useMemo } from 'react';
import { TransationsData } from '../../data/TransationsData';
import { Link } from 'react-router-dom';
import { LastTransationsCard } from './LastTransationsCard';
import { ThemeContext } from '../../Context/ThemeContext';

export const LastTransations = () => {
	// Vai ser exibido as ultimas transações
	const TransationsDataReverse = [...TransationsData].reverse();
	const { state } = useContext(ThemeContext);
	return (
		<section className={`${state}-last-transations`}>
			<h1 className={`${state}-last-transations-title`}>Ultimas Transações</h1>
			<ul className={`${state}-last-transations-list`}>
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
			<Link to={'/transacoes'} className='link-details'>Detalhes</Link>
		</section>
	);
};
