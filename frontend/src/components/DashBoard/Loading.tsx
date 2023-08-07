import { useContext, useEffect, useMemo, useState } from 'react';
import { VerifyTrueOrFalseLocalStorage } from '../../utils/VerifyLocalStorage';
import AlertLocalStorage from './AlertLocalStorage';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { createTheme } from '@mui/material';
import { ThemeSkeleton } from '../Themes/ThemeSkeleton';
import { ThemeContext } from '../../Context/ThemeContext';

export const Loading = () => {
	const [verifyLoading, setVerifyLoading] = useState<boolean>(false);
	const { state } = useContext(ThemeContext); // Selecionar Modo Dark
	const themeDisplaySkeleton = useMemo(() => createTheme(ThemeSkeleton(state)), [state]);
	const width_60 = { width: '60vw', height: '25vh', borderRadius: '15px', margin: '1rem' };
	const width_80 = { width: '85vw', height: '25vh', borderRadius: '15px', margin: '1rem' };
	const width_90 = { width: '90vw', height: '25vh', borderRadius: '15px', margin: '1rem' };
	const skeleton = (
		<div className='loading-skeleton-li'>
			<Stack spacing={1}>
				<Skeleton
					variant='rectangular'
					sx={[
						{ width: '30vw', height: '25vh', borderRadius: '15px', margin: '1rem' },
						{
							[themeDisplaySkeleton.breakpoints.down('laptop')]: { ...width_60 },
						},
						{
							[themeDisplaySkeleton.breakpoints.down('small_device')]: { ...width_80 },
						},
						{
							[themeDisplaySkeleton.breakpoints.down('mobile')]: { ...width_90 },
						},
					]}
				/>
			</Stack>
			<Stack spacing={1}>
				<Skeleton
					variant='rectangular'
					sx={[
						{ width: '15vw', height: '20vh', borderRadius: '15px', margin: '1rem' },
						{
							[themeDisplaySkeleton.breakpoints.down('laptop')]: { ...width_60 },
						},
						{
							[themeDisplaySkeleton.breakpoints.down('small_device')]: { ...width_80 },
						},
						{
							[themeDisplaySkeleton.breakpoints.down('mobile')]: { ...width_90 },
						},
					]}
				/>
			</Stack>
			<Stack spacing={1}>
				<Skeleton
					variant='rectangular'
					sx={[
						{ width: '15vw', height: '30vh', borderRadius: '15px', margin: '1rem' },
						{
							[themeDisplaySkeleton.breakpoints.down('laptop')]: { ...width_60 },
						},
						{
							[themeDisplaySkeleton.breakpoints.down('small_device')]: { ...width_80 },
						},
						{
							[themeDisplaySkeleton.breakpoints.down('mobile')]: { ...width_90 },
						},
					]}
				/>
			</Stack>
		</div>
	);

	useEffect(() => {
		if (VerifyTrueOrFalseLocalStorage()) {
			setVerifyLoading(true);
		}
	}, []);

	return (
		<section className='loading-skeleton'>
			<ul className='loading-skeleton-div'>
				<li>{skeleton}</li>
				<li>{skeleton}</li>
			</ul>
			{verifyLoading && <AlertLocalStorage />}
		</section>
	);
};
