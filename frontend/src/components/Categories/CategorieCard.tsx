import { ActionsType } from '../../Types/ActionsType';
import { useContext } from 'react';
import { CategoriesProps } from '../../Types/Categories/CategoriesProps';
import { CategoriesContext } from '../../Context/CategoriesContex';
import { ChildrenIcons } from './ChildrenIncon';
import { listIcons } from './Icons/IconsCategories';
import { CategorieType } from '../../Types/Categories/CategorieType';

export const CategorieCard = ({ categorie, setVerifyActionCategories, setFormDisplay }: CategoriesProps) => {
	const { dispatch, handlerSetFormValues } = useContext(CategoriesContext);

	const handlerFormValues = () => {
		handlerSetFormValues(categorie); // adicionando valores a serem atualizados
		setVerifyActionCategories(ActionsType.UPDATE);
		setFormDisplay(true);
	};

	const convertNameInComponent = (categorie: CategorieType) => {
		const { icon } = categorie;
		if (!!localStorage.getItem('localCategories')) {
			const searchComponent = listIcons.find(({ name }) => name === icon.name);
			return searchComponent?.component;
		}
		return icon.component;
	};

	// A categoria Metas não pode ser alterada ou apagada
	return (
		<div className='objective-card'>
			<p>#{categorie.id}</p>
			{}
			<ChildrenIcons>{convertNameInComponent(categorie)}</ChildrenIcons>
			<p>{categorie.name}</p>
			<button disabled={categorie.name === 'Metas'} onClick={() => handlerFormValues()}>
				Editar
			</button>
			<button
				disabled={categorie.name === 'Metas'}
				onClick={() => dispatch({ type: ActionsType.DELETE, payload: categorie })}
			>
				Apagar
			</button>
		</div>
	);
};
