import { ActionsType } from '../../Types/ActionsType';
import { useContext } from 'react';
import { CategoriesProps } from '../../Types/Categories/CategoriesProps';
import { CategoriesContext } from '../../Context/CategoriesContex';
import { ChildrenIcons } from './ChildrenIncon';
import { ConvertNameInComponent } from '../../utils/ConvertNameInComponent';
import { ThemeContext } from '../../Context/ThemeContext';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
import { ColorsIcons } from '../../utils/ColorsIcons';

export const CategorieCard = ({ categorie, setVerifyActionCategories, setFormDisplay, index }: CategoriesProps) => {
	const { dispatch, handlerSetFormValues } = useContext(CategoriesContext);
	const { state } = useContext(ThemeContext); // Selecionar Modo Dark
	const handlerFormValues = () => {
		handlerSetFormValues(categorie); // adicionando valores a serem atualizados
		setVerifyActionCategories(ActionsType.UPDATE);
		setFormDisplay(true);
	};

	// A categoria Metas não pode ser alterada ou apagada
	return (
		<article className={`${state}-theme-categories-card`}>
			<p className={`${state}-theme-categories-card-id class-equal-card`}>#{categorie.id + 1}</p>
			<p className='customize-icon' style={{ color: ColorsIcons[index] }}>
				<ChildrenIcons>{ConvertNameInComponent(categorie)}</ChildrenIcons>
			</p>
			<p className={`${state}-theme-categories-card-name class-equal-card`}>{categorie.name}</p>
			<div className={`${state}-theme-categories-card-buttons`}>
				<IconButton
					disabled={categorie.name === 'Metas'}
					sx={{ ':hover': { color: state === 'dark' ? '#1F2941' : '#fff' } }}
				>
					<SettingsIcon onClick={() => handlerFormValues()} />
				</IconButton>
				<IconButton disabled={categorie.name === 'Metas'}>
					<DeleteIcon
						sx={{ ':hover': { color: state === 'dark' ? '#1F2941' : '#fff' } }}
						onClick={() => dispatch({ type: ActionsType.DELETE, payload: categorie })}
					/>
				</IconButton>
			</div>
		</article>
	);
};
