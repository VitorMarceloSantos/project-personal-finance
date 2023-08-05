import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, MenuItem, Select, SelectChangeEvent, ThemeProvider, createTheme } from '@mui/material';
import { useContext, useMemo, useState } from 'react';
import { ObjectivesFilteredProps } from '../../Types/Objectives/ObjectivesProps';
import { ObjectiveContext } from '../../Context/ObjectiveContext';
import { ObjectiveType } from '../../Types/Objectives/ObjectivesType';
import { ThemeContext } from '../../Context/ThemeContext';
import { ThemeSearch } from '../Themes/ThemeSearch';

export const ObjectiveFilter = ({ stateObjectives }: ObjectivesFilteredProps) => {
	const {
		state: { cards },
	} = useContext(ObjectiveContext);
	const [filterSelected, setFilterSelected] = useState<keyof ObjectiveType>('name');
	const [filterGeneric, setFilterGeneric] = useState<string>('');
	const { objectivesFiltered, setObjectivesFiltered } = stateObjectives;
	const { state } = useContext(ThemeContext); // Selecionar Modo Dark
	const themeLigthOrDarkSearch = useMemo(() => createTheme(ThemeSearch(state)), [state]);

	const handlerFilterSelected = (event: SelectChangeEvent<'value' | 'name' | 'description' | 'id' | 'realized'>) => {
		const { target } = event;
		setFilterSelected(target.value as keyof ObjectiveType);
	};

	const handlerFilterGeneric = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { target } = event;
		// // No mínimo 1 letra para realizar o filtro
		if (target.value.length >= 1) {
			const targetInputLower = target.value.toLowerCase();
			const filtered = cards.filter((objective) =>
				(objective[filterSelected] as keyof ObjectiveType).toString().toLocaleLowerCase().includes(targetInputLower),
			);
			if (filtered.length !== 0) {
				setObjectivesFiltered(filtered);
			} else if (objectivesFiltered.length !== 0) setObjectivesFiltered([]);
		}
		if (target.value.length === 0 && objectivesFiltered.length !== 0) {
			// só vai ocorrer uma nova renderização nos componentes, caso o filteredMissions tenha recebido um filtro maior que zero
			setObjectivesFiltered([]);
		}
		setFilterGeneric(target.value);
	};
	return (
		<section className={`${state}-theme-objectives-filter`}>
			<ThemeProvider theme={themeLigthOrDarkSearch}>
				<Paper
					component='form'
					sx={[
						{
							width: '30vw',
							border: `1px solid ${themeLigthOrDarkSearch.palette.primary.main}`,
						},
						{
							[themeLigthOrDarkSearch.breakpoints.down('small_device')]: { width: '40vw' },
						},
						{
							[themeLigthOrDarkSearch.breakpoints.down('mobile')]: { width: '70vw' },
						},
					]}
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
						<MenuItem value='name'>Nome</MenuItem>
						<MenuItem value='description'>Descrição</MenuItem>
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
		</section>
	);
};
