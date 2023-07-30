import { ChildrenType } from '../Types/ChildrenType';
import { PaletteMode } from '@mui/material';
import { ThemeContext } from './ThemeContext';
import { useState } from 'react';

export const ThemeProvider = ({ children }: ChildrenType) => {
	const [state, setStateTheme] = useState<PaletteMode>('light');

	const handlerSetTheme = () => {
		setStateTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	};
	return <ThemeContext.Provider value={{ state, handlerSetTheme }}>{children}</ThemeContext.Provider>;
};
