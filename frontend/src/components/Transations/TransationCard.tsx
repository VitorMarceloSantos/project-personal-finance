import { ActionsType } from '../../Types/ActionsType';
import { useContext } from 'react';
import { TransationContext } from '../../Context/TransationContext';
import { TransationProps } from '../../Types/Transations/TransationProps';
import { updateValuesRealized } from '../../utils/UpdateValuesRealized';
import { ThemeContext } from '../../Context/ThemeContext';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

export const TransationCard = ({ transation, setFormDisplay, setverifyActionTransation }: TransationProps) => {
	const { dispatch, handlerSetFormValues } = useContext(TransationContext);
	const { state } = useContext(ThemeContext); // Selecionar Modo Dark

	const handlerFormValues = () => {
		handlerSetFormValues(transation); // adicionando valores a serem atualizados
		setverifyActionTransation(ActionsType.UPDATE);
		setFormDisplay(true);
	};
	return (
		<article className={`${state}-theme-transations-card`}>
			<div className={`${state}-theme-transations-card-id-type class-equal-card`}>
				<p className={`${state}-theme-transations-card-type class-equal-card`}>{transation.type}</p>
				<p className={`${state}-theme-transations-card-id class-equal-card`}>#00{transation.id + 1}</p>
			</div>
			{/* Verficando trasition.value não é undefined */}
			<p className={`${state}-theme-transations-card-value class-equal-card`}>
				{transation.value && transation.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
			</p>
			<p
				className={`${state}-theme-transations-card-category-destination class-equal-card`}
			>{`${transation.category}: ${transation.destination}`}</p>
			{/* <p className={`${state}-theme-transations-card-destination class-equal-card`}>{transation.destination}</p> */}
			<p className={`${state}-theme-transations-card-description`}>{transation.description}</p>
			{/* <p className={`${state}-theme-transations-card-type class-equal-card`}>{transation.type}</p> */}
			<div
				className={`${state}-theme-transations-card-buttons`}
				style={{ backgroundColor: transation.type === 'Receita' ? 'green' : 'red' }}
			>
				<IconButton sx={{ ':hover': { color: state === 'dark' ? '#1F2941' : '#EF54C5' } }}>
					<SettingsIcon onClick={() => handlerFormValues()} />
				</IconButton>
				<IconButton>
					<DeleteIcon
						sx={{ ':hover': { color: state === 'dark' ? '#1F2941' : '#EF54C5' } }}
						onClick={() => {
							transation.type === 'Receita' && updateValuesRealized(transation),
								dispatch({ type: ActionsType.DELETE, payload: transation });
						}}
					/>
				</IconButton>
			</div>
		</article>
	);
};
