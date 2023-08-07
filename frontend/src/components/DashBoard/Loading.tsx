import { useContext, useEffect, useMemo, useState } from 'react';
// import { SetReturnLocalStorageType } from '../../Types/DashBoard/UseStateReturnLocalStorageType';
import { VerifyTrueOrFalseLocalStorage } from '../../utils/VerifyLocalStorage';
import AlertLocalStorage from './AlertLocalStorage';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { createTheme, useMediaQuery } from '@mui/material';
import { ThemeSkeleton } from '../Themes/ThemeSkeleton';
import { ThemeContext } from '../../Context/ThemeContext';

export const Loading = () => {
	const [verifyLoading, setVerifyLoading] = useState<boolean>(false);
	const { state } = useContext(ThemeContext); // Selecionar Modo Dark
	const themeDisplaySkeleton = useMemo(() => createTheme(ThemeSkeleton(state)), [state]);
	// const widthDisplaySkeleton = useMediaQuery(themeLigthOrDarkForm.breakpoints.down('small_device')); // Retorna: true/false

	useEffect(() => {
		if (VerifyTrueOrFalseLocalStorage()) {
			setVerifyLoading(true);
		}
	}, []);

	return (
		<section className='loading-skeleton'>
			<div className='loading-skeleton-div'>
				<Stack spacing={1}>
					<Skeleton
						variant='rectangular'
						sx={[
							{ width: '30vw', height: '25vh', borderRadius: '15px' },
							{ [themeDisplaySkeleton.breakpoints.down('laptop')]: { width: '50vw' } },
							{
								[themeDisplaySkeleton.breakpoints.down('small_device')]: { width: '60vw' },
							},
							{
								[themeDisplaySkeleton.breakpoints.down('mobile')]: { width: '85vw' },
							},
						]}
					/>
				</Stack>
				<Stack spacing={1}>
					<Skeleton
						variant='rectangular'
						sx={[
							{ width: '15vw', height: '20vh', borderRadius: '15px' },
							{ [themeDisplaySkeleton.breakpoints.down('laptop')]: { width: '50vw' } },
							{
								[themeDisplaySkeleton.breakpoints.down('small_device')]: { width: '60vw' },
							},
							{
								[themeDisplaySkeleton.breakpoints.down('mobile')]: { width: '85vw' },
							},
						]}
					/>
				</Stack>
				<Stack spacing={1}>
					<Skeleton
						variant='rectangular'
						sx={[
							{ width: '15vw', height: '30vh', borderRadius: '15px' },
							{ [themeDisplaySkeleton.breakpoints.down('laptop')]: { width: '50vw' } },
							{
								[themeDisplaySkeleton.breakpoints.down('small_device')]: { width: '60vw' },
							},
							{
								[themeDisplaySkeleton.breakpoints.down('mobile')]: { width: '85vw' },
							},
						]}
					/>
				</Stack>
			</div>
			<div className='loading-skeleton-div'>
				<Stack spacing={1}>
					<Skeleton
						variant='rectangular'
						sx={[
							{ width: '30vw', height: '25vh', borderRadius: '15px' },
							{ [themeDisplaySkeleton.breakpoints.down('laptop')]: { width: '50vw' } },
							{
								[themeDisplaySkeleton.breakpoints.down('small_device')]: { width: '60vw' },
							},
							{
								[themeDisplaySkeleton.breakpoints.down('mobile')]: { width: '85vw' },
							},
						]}
					/>
				</Stack>
				<Stack spacing={1}>
					<Skeleton
						variant='rectangular'
						sx={[
							{ width: '15vw', height: '20vh', borderRadius: '15px' },
							{ [themeDisplaySkeleton.breakpoints.down('laptop')]: { width: '50vw' } },
							{
								[themeDisplaySkeleton.breakpoints.down('small_device')]: { width: '60vw' },
							},
							{
								[themeDisplaySkeleton.breakpoints.down('mobile')]: { width: '85vw' },
							},
						]}
					/>
				</Stack>
				<Stack spacing={1}>
					<Skeleton
						variant='rectangular'
						sx={[
							{ width: '15vw', height: '30vh', borderRadius: '15px' },
							{ [themeDisplaySkeleton.breakpoints.down('laptop')]: { width: '50vw' } },
							{
								[themeDisplaySkeleton.breakpoints.down('small_device')]: { width: '60vw' },
							},
							{
								[themeDisplaySkeleton.breakpoints.down('mobile')]: { width: '85vw' },
							},
						]}
					/>
				</Stack>
			</div>

			{verifyLoading && <AlertLocalStorage />}
		</section>
	);
};
