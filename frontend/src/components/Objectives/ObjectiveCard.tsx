import { ActionsType } from '../../Types/ActionsType';
import { useContext } from 'react';
// import { TransationContext } from '../../Context/TransationContext';
import { ObjectiveProps } from '../../Types/Objectives/ObjectivesProps';
import { ObjectiveContext } from '../../Context/ObjectiveContext';

export const ObjectiveCard = ({ objective, setverifyActionObjective, setFormDisplay }: ObjectiveProps) => {
	const { dispatch, handlerSetFormValues } = useContext(ObjectiveContext);

	const handlerFormValues = () => {
		handlerSetFormValues(objective); // adicionando valores a serem atualizados
		setverifyActionObjective(ActionsType.UPDATE);
		setFormDisplay(true);
	};
	return (
		<div className='objective-card'>
			<p>#{objective.id}</p>
			<p>{objective.name}</p>
			<p>{objective.description}</p>
			{/* Verficando objective.value não é undefined */}
			<p>{objective.value && objective.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
			<button onClick={() => handlerFormValues()}>Editar</button>
			<button onClick={() => dispatch({ type: ActionsType.DELETE, payload: objective })}>Apagar</button>
		</div>
	);
};
