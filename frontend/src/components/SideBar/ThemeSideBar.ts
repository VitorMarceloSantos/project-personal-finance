import { PaletteMode, createTheme } from '@mui/material';
// import { useState } from 'react';
// const [isDark, setIsDark] = useState<boolean>(false)

export const ThemeSideBar = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					// palette values for light mode
					primary: {
						main: '#cc2b9f',
					},
					secondary: {
						main: '#ef54c5',
					},
					// divider: amber[200],
					// text: {
					//   primary: grey[900],
					//   secondary: grey[800],
					// },
			  }
			: {
					// palette values for dark mode
					// palette values for light mode
					primary: {
						main: 'rgba(0, 0, 0, 0.87)',
					},
					secondary: {
						main: 'rgba(0, 0, 0, 0.6)',
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
