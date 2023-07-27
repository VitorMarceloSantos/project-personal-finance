import { Link } from 'react-router-dom';
import { ObjectivesData } from '../../data/ObjectivesData';
import { LastObjectivesCard } from './LastObjectivesCard';
import { useMemo } from 'react';

export const LastObjectives = () => {
	return (
		<section>
			<h1>Ultimas Metas</h1>
			<ul>
				{useMemo(
					() =>
						ObjectivesData.length !== 0 ? (
							ObjectivesData.slice(0, 2).map((objective, index) => (
								<li key={index} className='objective-card-dashboard'>
									<LastObjectivesCard objective={objective} index={index} />
								</li>
							))
						) : (
							<h2>Não há metas cadastradas.</h2>
						),
					[ObjectivesData],
				)}
			</ul>
			<Link to={'/metas'}>Mais ....</Link>
		</section>
	);
};
