import { useState } from 'react';
import { TransationProvider } from '../Context/TransationProvider';
import { TransationType } from '../Types/Transations/TransationsType';
import { TransationFilter } from '../components/Transations/TransationFilter';
import { CreateNewTransation } from '../components/Transations/CreateNewTransation';
import { TrasationListCards } from '../components/Transations/TrasationListCards';
import { ActionsType } from '../Types/ActionsType';
import { useNavigate } from 'react-router-dom';

export const Transations = () => {
	const [transationsFiltered, setTransationsFiltered] = useState<TransationType[]>([]);
	const [formDisplay, setFormDisplay] = useState<boolean>(false);
	const [verifyActionTransation, setverifyActionTransation] = useState<ActionsType>(ActionsType.ADD);
	const navigate = useNavigate();

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
				<button type='button' onClick={() => navigate('/')}>
				Dashboard
			</button>
			</section>
		</TransationProvider>
	);
};
