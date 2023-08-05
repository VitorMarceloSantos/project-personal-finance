import { useContext, useState } from 'react';
import { CategoriesProvider } from '../Context/CategoriesProvider';
import { CreateNewCategorie } from '../components/Categories/CreateNewCategorie';
import { ActionsType } from '../Types/ActionsType';
import { CategorieFilter } from '../components/Categories/CategorieFilter';
import { CategorieType } from '../Types/Categories/CategorieType';
import { CategorieListCards } from '../components/Categories/CategorieListCards';
import { ThemeContext } from '../Context/ThemeContext';
export const Categories = () => {
	const [categoriesFiltered, setCategoriesFiltered] = useState<CategorieType[]>([]);
	const [formDisplay, setFormDisplay] = useState<boolean>(false);
	const [verifyActionCategories, setVerifyActionCategories] = useState<ActionsType>(ActionsType.ADD);
	const { state } = useContext(ThemeContext);
	return (
		<CategoriesProvider>
			<section className={`${state}-theme-categories`}>
				<CategorieFilter stateCategories={{ categoriesFiltered, setCategoriesFiltered }} />
				<CreateNewCategorie
					stateFormDisplay={{ formDisplay, setFormDisplay }}
					stateCategoriesAction={{ setVerifyActionCategories, verifyActionCategories }}
				/>
				<ul className={`${state}-theme-categories-list`}>
					<CategorieListCards
						categoriesFiltered={categoriesFiltered}
						setFormDisplay={setFormDisplay}
						setVerifyActionCategories={setVerifyActionCategories}
					/>
				</ul>
			</section>
		</CategoriesProvider>
	);
};
