import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useContext, useState } from 'react';
import { TransationType } from '../../Types/TransationsType';
import { TransationContext } from '../../Context/TransationContext';
import { TransationsFilteredProps } from '../../Types/TransationProps';

export const TransationFilter = ({ stateTransations }: TransationsFilteredProps) => {
	const { state } = useContext(TransationContext);
	const [filterSelected, setFilterSelected] = useState<keyof TransationType>('value');
	const [filterGeneric, setFilterGeneric] = useState<string>('');
	const { transationsFiltered, setTransationsFiltered } = stateTransations;

	const handlerFilterSelected = (
		event: SelectChangeEvent<'value' | 'category' | 'description' | 'destination' | 'type'>,
	) => {
		const { target } = event;
		setFilterSelected(target.value as keyof TransationType);
	};

	const handlerFilterGeneric = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { target } = event;
		// // No mínimo 1 letra para realizar o filtro
		if (target.value.length >= 1) {
			const targetInputLower = target.value.toLowerCase();
			const filtered = state.filter((transation) =>
				transation[filterSelected].toString().toLocaleLowerCase().includes(targetInputLower),
			);

			if (filtered.length !== 0) {
				setTransationsFiltered(filtered);
			} else if (transationsFiltered.length !== 0) setTransationsFiltered([]);
		}
		if (target.value.length === 0 && transationsFiltered.length !== 0) {
			// só vai ocorrer uma nova renderização nos componentes, caso o filteredMissions tenha recebido um filtro maior que zero
			setTransationsFiltered([]);
		}
		setFilterGeneric(target.value);
	};
	return (
		<div>
			<Paper
				component='form'
				sx={{
					p: '2px 6px',
					display: 'flex',
					alignItems: 'center',
					width: 400,
					backgroundColor: 'transparent',
					border: '1px solid yellow',
				}}
			>
				<Select
					className='input-options'
					value={filterSelected}
					onChange={(e) => handlerFilterSelected(e)}
					name='type-filter'
					// Retirar bordas do input
					variant='standard'
					disableUnderline={true}
					sx={[
						{
							color: 'black',
							border: 'none',
							width: '110px',
							backgroundColor: 'yellow',
							textAlign: 'center',
							fontWeight: 'bold',
							fontFamily: 'Times New Roman',
						},
						// {
						// 	'&:hover': {
						// 		color: 'red',
						// 	},
						// },
					]}
				>
					<MenuItem value='value'>Valor</MenuItem>
					<MenuItem value='category'>Categoria</MenuItem>
					<MenuItem value='description'>Descrição</MenuItem>
					<MenuItem value='destination'>Destinação</MenuItem>
					<MenuItem value='type'>Tipo</MenuItem>
				</Select>
				<Divider sx={{ height: 40, m: 0.5, background: 'yellow', marginLeft: '.8rem' }} orientation='vertical' />
				<InputBase
					sx={{ ml: 1, flex: 1, color: 'black', fontWeight: 'bold', fontFamily: 'Times New Roman' }}
					placeholder='Pesquisar'
					value={filterGeneric}
					onChange={(e) => handlerFilterGeneric(e)}
				/>
				<IconButton type='button' sx={{ p: '0px', color: 'yellow' }} aria-label='search'>
					<SearchIcon />
				</IconButton>
			</Paper>
		</div>
	);
};
