import { useContext, useMemo } from 'react';
import { TransationContext } from '../../Context/TransationContext';
import { TransationsFilteredStateProps } from '../../Types/Transations/TransationProps';
import { TransationCard } from './TransationCard';
import { ThemeContext } from '../../Context/ThemeContext';

export const TrasationListCards = ({
	transationsFiltered,
	setFormDisplay,
	setverifyActionTransation,
}: TransationsFilteredStateProps) => {
	const { state } = useContext(ThemeContext);
	const {
		state: { cards },
	} = useContext(TransationContext);
	const verifyTransationsFiltered = transationsFiltered.length > 0 ? transationsFiltered : cards;
	// hooks não pode está dentro de uma condicional
	const memoCards = useMemo(
		() =>
			verifyTransationsFiltered.map((transation, index) => (
				<li key={index}>
					<TransationCard
						transation={transation}
						setFormDisplay={setFormDisplay}
						setverifyActionTransation={setverifyActionTransation}
					/>
				</li>
			)),
		[verifyTransationsFiltered],
	);
	return (
		<>
			{verifyTransationsFiltered.length !== 0 ? (
				memoCards
			) : (
				<h1 style={{ fontWeight: 'bold', margin: '1rem', color: state === 'dark' ? '#B0BEC5' : '#000' }}>
					Não há transações cadastradas.
				</h1>
			)}
		</>
	);
};
