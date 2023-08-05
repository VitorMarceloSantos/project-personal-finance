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
