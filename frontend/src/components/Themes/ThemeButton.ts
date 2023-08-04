import { PaletteMode } from '@mui/material';
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
		mobile: true, // add breakpoint
		small_device: true,
		small_tablet: true,
		laptop: true,
		desktop: true,
		large_device: true
  }
}

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
	breakpoints: {
    values: {
			mobile: 480,
			small_device: 767,
			small_tablet: 991,
			laptop: 1199,
			desktop: 1919,
			large_device: 1920
    },
  },
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					fontSize: '.8rem',
					marginTop: '.5rem',
					fontWeight: 'bold',
					boxShadow: '2px 2px 2px rgba(0,0,0, .2)',
				},
			},
		},
	},
});
