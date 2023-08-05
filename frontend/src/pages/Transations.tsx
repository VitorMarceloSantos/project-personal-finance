import { useContext, useState } from 'react';
import { TransationProvider } from '../Context/TransationProvider';
import { TransationType } from '../Types/Transations/TransationsType';
import { TransationFilter } from '../components/Transations/TransationFilter';
import { CreateNewTransation } from '../components/Transations/CreateNewTransation';
import { TrasationListCards } from '../components/Transations/TrasationListCards';
import { ActionsType } from '../Types/ActionsType';
import { ThemeContext } from '../Context/ThemeContext';

export const Transations = () => {
	const [transationsFiltered, setTransationsFiltered] = useState<TransationType[]>([]);
	const [formDisplay, setFormDisplay] = useState<boolean>(false);
	const [verifyActionTransation, setverifyActionTransation] = useState<ActionsType>(ActionsType.ADD);
	const { state } = useContext(ThemeContext);

	return (
		<TransationProvider>
			<section className={`${state}-theme-transations`}>
				<TransationFilter stateTransations={{ transationsFiltered, setTransationsFiltered }} />
				<CreateNewTransation
					stateFormDisplay={{ formDisplay, setFormDisplay }}
					stateTransationAction={{ verifyActionTransation, setverifyActionTransation }}
				/>
				{/* <div> */}
					<ul className={`${state}-theme-transations-list`}>
						<TrasationListCards
							transationsFiltered={transationsFiltered}
							setFormDisplay={setFormDisplay}
							setverifyActionTransation={setverifyActionTransation}
						/>
					</ul>
				{/* </div> */}
			</section>
		</TransationProvider>
	);
};
