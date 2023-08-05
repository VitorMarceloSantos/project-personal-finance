import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, MenuItem, Select, SelectChangeEvent, ThemeProvider, createTheme } from '@mui/material';
import { useContext, useMemo, useState } from 'react';
import { TransationType } from '../../Types/Transations/TransationsType';
import { TransationContext } from '../../Context/TransationContext';
import { TransationsFilteredProps } from '../../Types/Transations/TransationProps';
import { ThemeContext } from '../../Context/ThemeContext';
import { ThemeSearch } from '../Themes/ThemeSearch';

export const TransationFilter = ({ stateTransations }: TransationsFilteredProps) => {
	const {
		state: { cards },
	} = useContext(TransationContext);
	const [filterSelected, setFilterSelected] = useState<keyof TransationType>('value');
	const [filterGeneric, setFilterGeneric] = useState<string>('');
	const { transationsFiltered, setTransationsFiltered } = stateTransations;
	const { state } = useContext(ThemeContext); // Selecionar Modo Dark
	const themeLigthOrDarkSearch = useMemo(() => createTheme(ThemeSearch(state)), [state]);

	const handlerFilterSelected = (
		event: SelectChangeEvent<'value' | 'category' | 'description' | 'destination' | 'type' | 'id'>,
	) => {
		const { target } = event;
		setFilterSelected(target.value as keyof TransationType);
	};

	const handlerFilterGeneric = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { target } = event;
		
		// // No mínimo 1 letra para realizar o filtro
		if (target.value.length >= 1) {
			const targetInputLower = target.value.toLowerCase();
			const filtered = cards.filter((transation) =>
			// utilizando as keyof TransationType, para fazer a vericação de !== null
				(transation[filterSelected] as keyof TransationType).toString().toLocaleLowerCase().includes(targetInputLower),
			);
			console.log(filtered)
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
		<article className={`${state}-theme-transations-filter`}>
			<ThemeProvider theme={themeLigthOrDarkSearch}>
				<Paper
					component='form'
					sx={[{
						width: '30vw',
						border: `1px solid ${themeLigthOrDarkSearch.palette.primary.main}`,
					}, {
						[themeLigthOrDarkSearch.breakpoints.down('small_device')]: {width: '55vw'}
					}, {
						[themeLigthOrDarkSearch.breakpoints.down('mobile')]: {width: '75vw'}
					}]}
				>
					<Select
						className='input-options'
						value={filterSelected}
						onChange={(e) => handlerFilterSelected(e)}
						name='type-filter'
						variant='standard'
						disableUnderline={true}
						sx={[
							{
								color: themeLigthOrDarkSearch.palette.text.primary,
								width: '35%',
								backgroundColor: themeLigthOrDarkSearch.palette.primary.main,
							},
						]}
					>
						<MenuItem value='value'>Valor</MenuItem>
						<MenuItem value='category'>Categoria</MenuItem>
						<MenuItem value='description'>Descrição</MenuItem>
						<MenuItem value='destination'>Destinação</MenuItem>
						<MenuItem value='type'>Tipo</MenuItem>
					</Select>
					<Divider sx={{ background: themeLigthOrDarkSearch.palette.primary.main }} orientation='vertical' />
					<InputBase
						sx={{ flex: 1, color: themeLigthOrDarkSearch.palette.primary.main }}
						placeholder='Pesquisar'
						value={filterGeneric}
						onChange={(e) => handlerFilterGeneric(e)}
					/>
					<IconButton
						type='button'
						sx={{ p: '0px', color: themeLigthOrDarkSearch.palette.text.primary }}
						aria-label='search'
					>
						<SearchIcon />
					</IconButton>
				</Paper>
			</ThemeProvider>
		</article>
	);
};
