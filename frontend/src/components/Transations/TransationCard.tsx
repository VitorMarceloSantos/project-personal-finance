import { TransationActionType } from '../../Types/TransationActionType';
import { useContext } from 'react';
import { TransationContext } from '../../Context/TransationContext';
import { TransationProps } from '../../Types/TransationProps';

export const TransationCard = ({ transation }: TransationProps) => {
	const { dispatch } = useContext(TransationContext);
	return (
		<div className='transation-card'>
			<p>{transation.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
			<p>{transation.category}</p>
			<p>{transation.destination}</p>
			<p>{transation.description}</p>
			<p>{transation.type}</p>
			<button onClick={() => dispatch({ type: TransationActionType.UPDATE, payload: transation })}>Editar</button>
			<button onClick={() => dispatch({ type: TransationActionType.DELETE, payload: transation })}>Apagar</button>
		</div>
	);
};
