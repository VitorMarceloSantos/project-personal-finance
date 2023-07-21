import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useContext, useState } from 'react';
import { CategoriesFilteredProps } from '../../Types/Categories/CategoriesProps';
import { CategoriesContext } from '../../Context/CategoriesContex';

export const CategorieFilter = ({ stateCategories }: CategoriesFilteredProps) => {
	const {
		state: { cards },
	} = useContext(CategoriesContext);
	const [filterGeneric, setFilterGeneric] = useState<string>('');
	const { categoriesFiltered, setCategoriesFiltered } = stateCategories;

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
