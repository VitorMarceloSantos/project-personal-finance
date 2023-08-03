import { PaletteMode } from '@mui/material';

export const ThemeSideBar = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					// palette values for light mode
					primary: {
						main: '#cc2b9f',
						ligth: '#ef54c5',
					},
					secondary: {
						main: '#fafafa',
					},
			  }
			: {
					// palette values for dark mode
					primary: {
						main: '#1F2941',
						ligth: 'rgba(0, 0, 0, 0.6)',
					},
					secondary: {
						main: '#141B2D',
					},
			  }),
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					border: '1px solid #FFFFFF',
					backgroundColor: 'transparent',
					boxShadow: 'none',
					color: '#FFFFFF',
					fontWeight: 'bold',
					marginTop: '.5rem',
					'&&:hover': { background: '#FFFFFF', color: 'black', transition: '.5s' },
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					background: 'transparent',
					boxShadow: 'none',
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					color: '#FFFFFF',
					fontWeight: 'bold',
					textShadow: '1px 1px 1px #000',
					'&&:hover': {
						backgroundColor: 'white',
						color: 'black',
						transition: '.5s',
						textShadow: 'none',
						// Utilizando uma classe dentro do hover para mudar a cor do icone
						'.sidebar-icon': {
							color: 'black',
						},
					},
					'&&:focus': {
						color: 'black',
						backgroundColor: mode === 'light' ? '#fce4ec' : '#b0bec5',
						textShadow: 'none',
						'.sidebar-icon': {
							color: 'black',
							textShadow: 'none',
						},
					},
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					color: '#FFFFFF',
				},
			},
		},
	},
});
