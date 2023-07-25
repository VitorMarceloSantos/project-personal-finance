import { useEffect, useMemo, useState } from 'react';
import { CategoriesData } from '../../data/CategoriesData';
import { ConvertNameInComponent } from '../../utils/ConvertNameInComponent';
import { ChildrenIcons } from '../Categories/ChildrenIncon';
import { CategorieType } from '../../Types/Categories/CategorieType';
import { initialCategories } from '../../utils/InitialStateCategories';

export const LastCategories = () => {
	const [categoriesList, setCategoriesList] = useState<CategorieType[]>(initialCategories.slice(0, 4));
	// let categoriesList: CategorieType[] = []

	useEffect(() => {
		if (CategoriesData.length !== 0) {
			if (CategoriesData.length > 4) {
				setCategoriesList([...CategoriesData.slice(0, 4)]);
			} else setCategoriesList([...CategoriesData]);
		}
	}, []);
	return (
		<section>
			<h1>Ultimas Categorias</h1>
			<ul>
				{useMemo(
					() =>
						categoriesList.length !== 0 ? (
							categoriesList.map((categorie, index) => (
								<li key={index}>
									<ChildrenIcons>{ConvertNameInComponent(categorie)}</ChildrenIcons>
									<p>{categorie.name}</p>
								</li>
							))
						) : (
							<h2>Nenhuma categoria foi encontrada.</h2>
						),
					[categoriesList],
				)}
				{}
			</ul>
		</section>
	);
};
