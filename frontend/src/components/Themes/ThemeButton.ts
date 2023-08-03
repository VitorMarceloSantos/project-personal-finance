import { PaletteMode } from '@mui/material';

export const ThemeButton = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					// palette values for light mode
					primary: {
						main: '#D655B2',
					},
					text: {
						primary: '#F0F5FF',
						secondary: '#000',
					},
			  }
			: {
					// palette values for dark mode
					primary: {
						main: '#B0BEC5',
					},
					text: {
						primary: '#F0F5FF',
						secondary: '#000',
					},
			  }),
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					marginTop: '.5rem',
					fontWeight: 'bold',
					boxShadow: '2px 2px 2px rgba(0,0,0, .2)',
				},
			},
		},
	},
});
