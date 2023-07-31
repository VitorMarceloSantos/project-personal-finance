import { useContext, useMemo } from 'react';
import { CategoriesData } from '../../data/CategoriesData';
import { ConvertNameInComponent } from '../../utils/ConvertNameInComponent';
import { ChildrenIcons } from '../Categories/ChildrenIncon';
import { CategorieType } from '../../Types/Categories/CategorieType';
import { initialCategories } from '../../utils/InitialStateCategories';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../Context/ThemeContext';
import { ColorsIcons } from '../../utils/ColorsIcons';

export const LastCategories = () => {
	const { state } = useContext(ThemeContext);
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
		<section className={`${state}-last-categories`}>
			<h1 className={`${state}-last-categories-title`}>Ultimas Categorias</h1>
			<ul className={`${state}-last-categories-list`}>
				{useMemo(
					() =>
						valueInitialCategories.length !== 0 ? (
							valueInitialCategories.map((categorie, index) => (
								<li key={index} className='last-categories-card'>
									<div style={{color: `${ColorsIcons[index]}`}}>
									<ChildrenIcons>{ConvertNameInComponent(categorie)}</ChildrenIcons>
									</div>
									<p className='last-categories-card-text'>{categorie.name}</p>
								</li>
							))
						) : (
							<h2>Nenhuma categoria foi encontrada.</h2>
						),
					[valueInitialCategories],
				)}
			</ul>
			<Link to={'/categorias'} className='link-details'>Detalhes.</Link>
		</section>
	);
};
