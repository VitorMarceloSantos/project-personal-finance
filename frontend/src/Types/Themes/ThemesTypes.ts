import { PaletteMode } from '@mui/material';

export type ThemesValueType = {
	state: PaletteMode;
	handlerSetTheme: () => void;
};
