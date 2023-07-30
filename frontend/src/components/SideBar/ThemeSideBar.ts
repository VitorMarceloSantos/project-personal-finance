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
						main: '#fff',
					},
					// divider: amber[200],
					text: {
					  primary: '#000',
					  secondary: '#212121,'
					},
			  }
			: {
					// palette values for dark mode
					// palette values for light mode
					primary: {
						main: '#1F2941',
						ligth: 'rgba(0, 0, 0, 0.6)',
					},
					secondary: {
						main: '#141B2D',
					},
					text: {
						primary: '#F0F5FF',
						secondary: '#4B526D',
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
					'&&:hover': {
						backgroundColor: 'white',
						color: 'black',
						transition: '.5s',
						// Utilizando uma classe dentro do hover para mudar a cor do icone
						'.sidebar-icon': {
							color: 'black',
						},
					},
					'&&:focus': {
						color: 'black',
						backgroundColor: '#fce4ec',
						'.sidebar-icon': {
							color: 'black',
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
