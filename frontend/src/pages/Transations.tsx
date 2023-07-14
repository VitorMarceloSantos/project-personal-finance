import { useMemo, useState } from 'react';
import { TransationProvider } from '../Context/TransationProvider';
import { TransationCard } from '../components/Transations/TransationCard';
import { TransationsData } from '../data/TransationsData';
import { TransationType } from '../Types/TransationsType';
import { TransationFilter } from '../components/Transations/TransationFilter';
import { CreateNewTransation } from '../components/Transations/CreateNewTransation';

export const Transations = () => {
	const [transationsFiltered, setTransationsFiltered] = useState<TransationType[]>([]);
	const verifyTransationsFiltered = transationsFiltered.length > 0 ? transationsFiltered : TransationsData;

	return (
		<TransationProvider>
			<section>
				<h1>Transacoes</h1>
				<TransationFilter stateTransations={{ transationsFiltered, setTransationsFiltered }} />
				<CreateNewTransation />
				<div className='trasations-card-container'>
					<ul>
						{useMemo(
							() =>
								verifyTransationsFiltered.map((transation, index) => (
									<li key={index}>
										<TransationCard transation={transation} />
									</li>
								)),
							[verifyTransationsFiltered],
						)}
					</ul>
				</div>
				{}
			</section>
		</TransationProvider>
	);
};
