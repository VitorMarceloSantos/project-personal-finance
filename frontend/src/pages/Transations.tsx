import { useState } from 'react';
import { TransationProvider } from '../Context/TransationProvider';
import { TransationType } from '../Types/TransationsType';
import { TransationFilter } from '../components/Transations/TransationFilter';
import { CreateNewTransation } from '../components/Transations/CreateNewTransation';
import { TrasationListCards } from '../components/Transations/TrasationListCards';
import { TransationActionType } from '../Types/TransationActionType';

export const Transations = () => {
	const [transationsFiltered, setTransationsFiltered] = useState<TransationType[]>([]);
	const [formDisplay, setFormDisplay] = useState<boolean>(false);
	const [verifyActionTransation, setverifyActionTransation] = useState<TransationActionType>(TransationActionType.ADD);

	return (
		<TransationProvider>
			<section>
				<h1>Transacoes</h1>
				<TransationFilter stateTransations={{ transationsFiltered, setTransationsFiltered }} />
				<CreateNewTransation
					stateFormDisplay={{ formDisplay, setFormDisplay }}
					stateTransationAction={{ verifyActionTransation, setverifyActionTransation }}
				/>
				<div className='trasations-card-container'>
					<ul>
						<TrasationListCards
							transationsFiltered={transationsFiltered}
							setFormDisplay={setFormDisplay}
							setverifyActionTransation={setverifyActionTransation}
						/>
					</ul>
				</div>
				{}
			</section>
		</TransationProvider>
	);
};
