import { useMemo } from 'react';
import { CategoriesData } from '../../data/CategoriesData';
import { ConvertNameInComponent } from '../../utils/ConvertNameInComponent';
import { ChildrenIcons } from '../Categories/ChildrenIncon';
import { CategorieType } from '../../Types/Categories/CategorieType';
import { initialCategories } from '../../utils/InitialStateCategories';
import { Link } from 'react-router-dom';

export const LastCategories = () => {
	let valueInitialCategories: CategorieType[] = [];
	// Dessa forma não é necessário utilizar o useEffect, pois o conteudo será renderizado com as categorias corretas.
	// Utilizando o useEffect primeiramente seria renderizado uma categoria(ou um loading), para depois realizar a comparação com o CategoriesData.
	if (CategoriesData.length !== 0) {
		if (CategoriesData.length > 4) {
			valueInitialCategories.push(...CategoriesData.slice(0, 4));
		} else valueInitialCategories.push(...CategoriesData);
	} else {
		valueInitialCategories.push(...initialCategories.slice(0, 4));
	}

	return (
		<section>
			<h1>Ultimas Categorias</h1>
			<ul>
				{useMemo(
					() =>
						valueInitialCategories.length !== 0 ? (
							valueInitialCategories.map((categorie, index) => (
								<li key={index}>
									<ChildrenIcons>{ConvertNameInComponent(categorie)}</ChildrenIcons>
									<p>{categorie.name}</p>
								</li>
							))
						) : (
							<h2>Nenhuma categoria foi encontrada.</h2>
						),
					[valueInitialCategories],
				)}
			</ul>
			<Link to={'/categorias'}>Mais ....</Link>
		</section>
	);
};
