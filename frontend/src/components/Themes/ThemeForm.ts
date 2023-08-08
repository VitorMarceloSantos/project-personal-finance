import { PaletteMode } from '@mui/material';
declare module '@mui/material/styles' {
	interface BreakpointOverrides {
		xs: false; // removes breakpoint
		sm: false;
		md: false;
		lg: false;
		xl: false;
		mobile: true; // add breakpoint
		small_device: true;
		small_tablet: true;
		laptop: true;
		desktop: true;
		large_device: true;
	}
}

export const ThemeForm = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					// palette values for light mode
					primary: {
						main: '#cc2b9f',
					},
					secondary: {
						main: '#fafafa',
					},
					text: {
						primary: '#000',
					},
			  }
			: {
					// palette values for dark mode
					primary: {
						main: '#B0BEC5',
					},
					text: {
						primary: '#F0F5FF',
					},
			  }),
	},
	breakpoints: {
		values: {
			mobile: 480,
			small_device: 767,
			small_tablet: 991,
			laptop: 1199,
			desktop: 1919,
			large_device: 1920,
		},
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
					padding: '1rem',
					background: 'transparent',
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					textAlign: 'center',
				},
			},
		} as any,
		MuiInputBase: {
			styleOverrides: {
				root: {
					margin: '.5rem',
					fontWeight: 'bold',
					fontFamily: 'Times New Roman',
					borderRadius: '5px',
					paddingLeft: '.5rem',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontSize: '.8rem',
					width: '15vw',
					margin: '.5rem',
					fontWeight: 'bold',
					fontFamily: 'Times New Roman',
				},
			},
		},
		MuiList: {
			styleOverrides: {
				root: {
					backgroundColor: mode === 'light' ? '#cc2b9f' : '#B0BEC5',
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					color: '#fff',
					fontWeight: 'bold',
				},
			},
		},
	},
});
