import { ActionsType } from '../../Types/ActionsType';
import { useContext } from 'react';
import { TransationContext } from '../../Context/TransationContext';
import { TransationProps } from '../../Types/Transations/TransationProps';

export const TransationCard = ({ transation, setFormDisplay, setverifyActionTransation }: TransationProps) => {
	const { dispatch, handlerSetFormValues } = useContext(TransationContext);

	const handlerFormValues = () => {
		handlerSetFormValues(transation); // adicionando valores a serem atualizados
		setverifyActionTransation(ActionsType.UPDATE);
		setFormDisplay(true);
	};
	return (
		<div className='transation-card'>
			<p>#{transation.id}</p>
			{/* Verficando trasition.value não é undefined */}
			<p>{transation.value && transation.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
			<p>{transation.category}</p>
			<p>{transation.destination}</p>
			<p>{transation.description}</p>
			<p>{transation.type}</p>
			<button onClick={() => handlerFormValues()}>Editar</button>
			<button onClick={() => dispatch({ type: ActionsType.DELETE, payload: transation })}>Apagar</button>
		</div>
	);
};
