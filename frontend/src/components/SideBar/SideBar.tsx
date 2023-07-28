import {
	Avatar,
	Box,
	Button,
	Divider,
	Drawer,
	InputBase,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	PaletteMode,
	Paper,
	ThemeProvider,
	createTheme,
} from '@mui/material';
import { ChildrenType } from '../../Types/ChildrenType';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { UploadImage } from '../../Types/UploadImage';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';
import { ThemeSideBar } from './ThemeSideBar';
import { MaterialUISwitch } from './SwitchButton';
// https://www.youtube.com/watch?v=o3B9KTlod4w&ab_channel=coder4life
export const SideBar: React.FC<ChildrenType> = ({ children }) => {
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm<UploadImage>({});
	const [file, setFile] = useState('');
	const newImage: File | string = !!file ? file : '../src/assets/userImg.jpg';
	const [mode, setMode] = useState<PaletteMode>('light'); // Selecionar Modo Dark

	const handleFileChange = (fileImg: any) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			!!reader.result && setFile(reader.result.toString());
		};
		reader.readAsDataURL(fileImg);
	};

	const onSubmit = (data: any) => {
		if (data.files.length > 0) {
			handleFileChange(data.files[0]);
		}
	};

	const handleChangeModeDark = () => {
		setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	const themeLigthOrDark = useMemo(() => createTheme(ThemeSideBar(mode)), [mode]);

	return (
		<>
			<ThemeProvider theme={themeLigthOrDark}>
				{/* theme.spacing(28) -> 28 é um padrão de medida do materialUI(aproximadamente 4px cada 1spacing) */}
				<Drawer variant='permanent'>
					<Box
						sx={{
							width: themeLigthOrDark.spacing(28),
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Box
							sx={{
								height: themeLigthOrDark.spacing(30),
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: themeLigthOrDark.palette.primary.main,
							}}
						>
							<MaterialUISwitch sx={{ m: 1 }} onChange={handleChangeModeDark} />
							<Avatar src={newImage} sx={{ width: 80, height: 80 }} />
							<form onSubmit={handleSubmit(onSubmit)} className='sidebar-form-picture'>
								<Paper
									component='form'
									sx={{
										p: '1rem',
									}}
								>
									<label htmlFor='upload-img' className='sidebar-label-inpunt-file'>
										ENVIAR FOTO
										<InputBase
											{...register('files')}
											id='upload-img'
											sx={{
												display: 'none',
											}}
											type='file'
										/>
									</label>
								</Paper>
								<Button type='submit' variant='outlined' startIcon={<CheckCircleIcon />}>
									Confirmar
								</Button>
							</form>
						</Box>
						<Divider sx={{ backgroundColor: 'white' }} />
						<Box sx={{ flex: 1, backgroundColor: themeLigthOrDark.palette.secondary.main }}>
							<List>
								<ListItem disablePadding>
									<ListItemButton onClick={() => navigate('/')}>
										<ListItemIcon className='sidebar-icon'>
											<DashboardIcon />
										</ListItemIcon>
										<ListItemText primary='DashBoard' />
									</ListItemButton>
								</ListItem>

								<ListItem disablePadding>
									<ListItemButton onClick={() => navigate('/transacoes')}>
										<ListItemIcon className='sidebar-icon'>
											<CompareArrowsIcon />
										</ListItemIcon>
										<ListItemText primary='Transações' />
									</ListItemButton>
								</ListItem>

								<ListItem disablePadding>
									<ListItemButton onClick={() => navigate('/metas')}>
										<ListItemIcon className='sidebar-icon'>
											<AddTaskIcon />
										</ListItemIcon>
										<ListItemText primary='Metas' />
									</ListItemButton>
								</ListItem>

								<ListItem disablePadding>
									<ListItemButton onClick={() => navigate('/categorias')}>
										<ListItemIcon className='sidebar-icon'>
											<CategoryIcon />
										</ListItemIcon>
										<ListItemText primary='Categorias' />
									</ListItemButton>
								</ListItem>
							</List>
						</Box>
					</Box>
				</Drawer>
				<Box sx={{ height: '100vh', marginLeft: themeLigthOrDark.spacing(28) }}>{children}</Box>
			</ThemeProvider>
		</>
	);
};
