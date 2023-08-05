import { useContext, useMemo } from 'react';
import { CategoriesFilteredStateProps } from '../../Types/Categories/CategoriesProps';
import { CategoriesContext } from '../../Context/CategoriesContex';
import { CategorieCard } from './CategorieCard';

export const CategorieListCards = ({
	categoriesFiltered,
	setFormDisplay,
	setVerifyActionCategories,
}: CategoriesFilteredStateProps) => {
	const {
		state: { cards },
	} = useContext(CategoriesContext);
	const verifyCategoriesFiltered = categoriesFiltered.length > 0 ? categoriesFiltered : cards;
	// hooks não pode está dentro de uma condicional
	const memoCards = useMemo(
		() =>
			verifyCategoriesFiltered.map((categorie, index) => (
				<li key={index}>
					<CategorieCard
						categorie={categorie}
						setFormDisplay={setFormDisplay}
						setVerifyActionCategories={setVerifyActionCategories}
						index={index}
					/>
				</li>
			)),
		[verifyCategoriesFiltered],
	);
	return <>{verifyCategoriesFiltered.length !== 0 ? memoCards : <h1>Não há objetivos cadastrados</h1>}</>;
};
