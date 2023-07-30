import { createContext } from 'react';
import { ThemesValueType } from '../Types/Themes/ThemesTypes';

export const ThemeContext = createContext<ThemesValueType>({
	state: 'light',
	handlerSetTheme: () => [],
});
