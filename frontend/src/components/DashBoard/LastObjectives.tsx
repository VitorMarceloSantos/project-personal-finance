import { Link } from 'react-router-dom';
import { ObjectivesData } from '../../data/ObjectivesData';
import { LastObjectivesCard } from './LastObjectivesCard';
import { useContext, useMemo } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';

export const LastObjectives = () => {
	const { state } = useContext(ThemeContext);
	return (
		<section className={`${state}-last-objective`}>
			<h1 className={`${state}-last-objective-title`}>Ultimas Metas</h1>
			<ul className={`${state}-last-objective-list`}>
				{useMemo(
					() =>
						ObjectivesData.length !== 0 ? (
							ObjectivesData.slice(0, 2).map((objective, index) => (
								<li key={index} className='objective-card-dashboard'>
									<LastObjectivesCard objective={objective} index={index} />
								</li>
							))
						) : (
							<h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>Não há metas cadastradas.</h2>
						),
					[ObjectivesData],
				)}
			</ul>
			<Link to={'/metas'} className='link-details'>
				Detalhes
			</Link>
		</section>
	);
};
