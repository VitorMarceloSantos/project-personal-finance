import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useContext, useMemo, useState } from 'react';
import { CategoriesFilteredProps } from '../../Types/Categories/CategoriesProps';
import { CategoriesContext } from '../../Context/CategoriesContex';
import { ThemeContext } from '../../Context/ThemeContext';
import { ThemeProvider, createTheme } from '@mui/material';
import { ThemeSearch } from '../Themes/ThemeSearch';

export const CategorieFilter = ({ stateCategories }: CategoriesFilteredProps) => {
	const {
		state: { cards },
	} = useContext(CategoriesContext);
	const [filterGeneric, setFilterGeneric] = useState<string>('');
	const { categoriesFiltered, setCategoriesFiltered } = stateCategories;
	const { state } = useContext(ThemeContext); // Selecionar Modo Dark
	const themeLigthOrDarkSearch = useMemo(() => createTheme(ThemeSearch(state)), [state]);

	const handlerFilterGeneric = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { target } = event;
		// // No mínimo 2 letra para realizar o filtro
		if (target.value.length >= 2) {
			const targetInputLower = target.value.toLowerCase();
			const filtered = cards.filter(({ name }) => name.toLocaleLowerCase().includes(targetInputLower));
			if (filtered.length !== 0) {
				setCategoriesFiltered(filtered);
			} else if (categoriesFiltered.length !== 0) setCategoriesFiltered([]);
		}
		if (target.value.length === 0 && categoriesFiltered.length !== 0) {
			// só vai ocorrer uma nova renderização nos componentes, caso o filteredMissions tenha recebido um filtro maior que zero
			setCategoriesFiltered([]);
		}
		setFilterGeneric(target.value);
	};
	return (
		<section className={`${state}-theme-categories-filter`}>
			<ThemeProvider theme={themeLigthOrDarkSearch}>
				<Paper
					component='form'
					sx={[
						{
							width: '30vw',
							border: `1px solid ${themeLigthOrDarkSearch.palette.primary.main}`,
						},
						{
							[themeLigthOrDarkSearch.breakpoints.down('small_device')]: { width: '55vw' },
						},
						{
							[themeLigthOrDarkSearch.breakpoints.down('mobile')]: { width: '75vw' },
						},
					]}
				>
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
