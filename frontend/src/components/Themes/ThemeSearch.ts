import { PaletteMode, createTheme } from '@mui/material';

// const finalTheme = createTheme({
// 	components: {
// 		MuiSelect: {},
//     MuiInputBase
// 	},
// });


export const ThemeSearch = (mode: PaletteMode) => ({
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
						main: '#B0BEC5',
						// ligth: 'rgba(0, 0, 0, 0.6)',
					},
					text: {
						primary: '#F0F5FF',
					},
			  }),
	},
	components: {
		MuiSelect: {
			styleOverrides: {
				root: {
          border: 'none',
					textAlign: 'center',
					fontWeight: 'bold',
					fontFamily: 'Times New Roman',
				},
			},
		} as any,

		MuiPaper: {
			styleOverrides: {
				root: {
          boxShadow: '2px 2px 2px rgba(0,0,0, .2)',
					padding: '.2rem .5rem',
					background: 'transparent',
					display: 'flex',
					alignItems: 'center',
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					height: '2.2rem',
					margin: '0.2rem .5rem',
					// marginLeft: '.8rem',
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					marginLeft: '2.rem',
					fontWeight: 'bold',
					fontFamily: 'Times New Roman',
				},
			},
		},
		// MuiListItemButton: {
		// 	styleOverrides: {
		// 		root: {
		// 			color: '#FFFFFF',
		// 			fontWeight: 'bold',
		// 			textShadow: '1px 1px 1px #000',
		// 			'&&:hover': {
		// 				backgroundColor: 'white',
		// 				color: 'black',
		// 				transition: '.5s',
		// 				textShadow: 'none',
		// 				// Utilizando uma classe dentro do hover para mudar a cor do icone
		// 				'.sidebar-icon': {
		// 					color: 'black',
		// 				},
		// 			},
		// 			'&&:focus': {
		// 				color: 'black',
		// 				backgroundColor: mode === 'light' ? '#fce4ec' : '#b0bec5',
		// 				textShadow: 'none',
		// 				'.sidebar-icon': {
		// 					color: 'black',
		// 					textShadow: 'none',
		// 				},
		// 			},
		// 		},
		// 	},
		// },
    MuiList: {
			styleOverrides: {
				root: {
					backgroundColor: mode === 'light' ? '#cc2b9f': '#B0BEC5'
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					color: '#fff',
          // mode === 'light' ? '#000': '#fff'
          fontWeight: 'bold',
				},
			},
		},
	},
});
