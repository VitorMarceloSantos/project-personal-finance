import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoriesProvider } from '../Context/CategoriesProvider';
import { CreateNewCategorie } from '../components/Categories/CreateNewCategorie';
import { ActionsType } from '../Types/ActionsType';
import { CategorieFilter } from '../components/Categories/CategorieFilter';
import { CategorieType } from '../Types/Categories/CategorieType';
import { CategorieListCards } from '../components/Categories/CategorieListCards';
export const Categories = () => {
	const [categoriesFiltered, setCategoriesFiltered] = useState<CategorieType[]>([]);
	const [formDisplay, setFormDisplay] = useState<boolean>(false);
	const [verifyActionCategories, setVerifyActionCategories] = useState<ActionsType>(ActionsType.ADD);
	const navigate = useNavigate();
	return (
		<CategoriesProvider>
			<section>
				<h1>Categorias</h1>
				<CategorieFilter stateCategories={{ categoriesFiltered, setCategoriesFiltered }} />
				<CreateNewCategorie
					stateFormDisplay={{ formDisplay, setFormDisplay }}
					stateCategoriesAction={{ setVerifyActionCategories, verifyActionCategories }}
				/>
				<div className='categories-card-container'>
					<ul>
						<CategorieListCards
							categoriesFiltered={categoriesFiltered}
							setFormDisplay={setFormDisplay}
							setVerifyActionCategories={setVerifyActionCategories}
						/>
					</ul>
				</div>
				<button type='button' onClick={() => navigate('/')}>
					Dashboard
				</button>
			</section>
		</CategoriesProvider>
	);
};
