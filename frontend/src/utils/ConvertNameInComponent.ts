import { CategorieType } from "../Types/Categories/CategorieType";
import { listIcons } from "../components/Categories/Icons/IconsCategories";

export const ConvertNameInComponent = (categorie: CategorieType) => {
  const { icon } = categorie;
  if (!!localStorage.getItem('localCategories')) {
    const searchComponent = listIcons.find(({ name }) => name === icon.name);
    return searchComponent?.component;
  }
  return icon.component;
};