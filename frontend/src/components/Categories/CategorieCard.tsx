import { ActionsType } from '../../Types/ActionsType';
import { useContext } from 'react';
import { CategoriesProps } from '../../Types/Categories/CategoriesProps';
import { CategoriesContext } from '../../Context/CategoriesContex';
import { ChildrenIcons } from './ChildrenIncon';

export const CategorieCard = ({ categorie, setVerifyActionCategories, setFormDisplay }: CategoriesProps) => {
	const { dispatch, handlerSetFormValues } = useContext(CategoriesContext);

	const handlerFormValues = () => {
		handlerSetFormValues(categorie); // adicionando valores a serem atualizados
		setVerifyActionCategories(ActionsType.UPDATE);
		setFormDisplay(true);
	};

	return (
		<div className='objective-card'>
			<p>#{categorie.id}</p>
			<ChildrenIcons>{categorie.icon}</ChildrenIcons>
			<p>{categorie.name}</p>
			<button onClick={() => handlerFormValues()}>Editar</button>
			<button onClick={() => dispatch({ type: ActionsType.DELETE, payload: categorie })}>Apagar</button>
		</div>
	);
};
