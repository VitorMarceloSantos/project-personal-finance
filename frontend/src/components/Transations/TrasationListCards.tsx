import { useContext, useMemo } from 'react';
import { TransationContext } from '../../Context/TransationContext';
import { TransationsFilteredStateProps } from '../../Types/TransationProps';
import { TransationCard } from './TransationCard';

export const TrasationListCards = ({
	transationsFiltered,
	setFormDisplay,
	setverifyActionTransation,
}: TransationsFilteredStateProps) => {
	const {
		state: { cards },
	} = useContext(TransationContext);
	const verifyTransationsFiltered = transationsFiltered.length > 0 ? transationsFiltered : cards;
	return (
		<>
			{verifyTransationsFiltered.length !== 0 ? (
				useMemo(
					() =>
						verifyTransationsFiltered?.map((transation, index) => (
							<li key={index}>
								<TransationCard
									transation={transation}
									setFormDisplay={setFormDisplay}
									setverifyActionTransation={setverifyActionTransation}
								/>
							</li>
						)),
					[verifyTransationsFiltered],
				)
			) : (
				<h1>Não há transações cadastradas</h1>
			)}
		</>
	);
};
