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
	Paper,
	ThemeProvider,
	createTheme,
	useMediaQuery,
} from '@mui/material';
import { ChildrenType } from '../../Types/ChildrenType';
import { useContext, useMemo, useState } from 'react';
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
import { ThemeContext } from '../../Context/ThemeContext';
import { DrawerContext } from '../../Context/DrawerContext';
import MenuIcon from '@mui/icons-material/Menu';
// https://www.youtube.com/watch?v=o3B9KTlod4w&ab_channel=coder4life
export const SideBar: React.FC<ChildrenType> = ({ children }) => {
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm<UploadImage>({});
	const [file, setFile] = useState('');
	const newImage: File | string = !!file ? file : '../src/assets/userImg.jpg';
	const { state, handlerSetTheme } = useContext(ThemeContext); // Selecionar Modo Dark

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

	const handleOnClickNavBar = (link: string) => {
		// Fechar a sideBar quando clicar no link da sideBar
		if (isDrawerOpen) {
			handlerSetDrawer();
		}
		navigate(link);
	};

	const themeLigthOrDark = useMemo(() => createTheme(ThemeSideBar(state)), [state]);
	const widthDisplay = useMediaQuery('(max-width:1024px)'); // Retorna: true/false
	const { isDrawerOpen, handlerSetDrawer } = useContext(DrawerContext);
	return (
		<>
			<ThemeProvider theme={themeLigthOrDark}>
				{/* theme.spacing(28) -> 28 é um padrão de medida do materialUI(aproximadamente 4px cada 1spacing) */}
				<Drawer open={isDrawerOpen} variant={widthDisplay ? 'temporary' : 'permanent'} onClose={handlerSetDrawer}>
					{/* open: utilizado apenas pela variant -> temporary   -  onClose: vai ser usado para quando houver qualquer clique fora do menu dispara uma função*/}
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
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									justifyContent: 'flex-end',
									height: '1rem',
									position: 'relative',
									top: '-1.3rem',
								}}
							>
								<MaterialUISwitch sx={{ m: 1 }} onChange={handlerSetTheme} />
							</Box>
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
						<Box sx={{ flex: 1, backgroundColor: themeLigthOrDark.palette.primary.light }}>
							<List>
								<ListItem disablePadding>
									<ListItemButton onClick={() => handleOnClickNavBar('/')}>
										<ListItemIcon className='sidebar-icon'>
											<DashboardIcon />
										</ListItemIcon>
										<ListItemText primary='DashBoard' />
									</ListItemButton>
								</ListItem>

								<ListItem disablePadding>
									<ListItemButton onClick={() => handleOnClickNavBar('/transacoes')}>
										<ListItemIcon className='sidebar-icon'>
											<CompareArrowsIcon />
										</ListItemIcon>
										<ListItemText primary='Transações' />
									</ListItemButton>
								</ListItem>

								<ListItem disablePadding>
									<ListItemButton onClick={() => handleOnClickNavBar('/metas')}>
										<ListItemIcon className='sidebar-icon'>
											<AddTaskIcon />
										</ListItemIcon>
										<ListItemText primary='Metas' />
									</ListItemButton>
								</ListItem>

								<ListItem disablePadding>
									<ListItemButton onClick={() => handleOnClickNavBar('/categorias')}>
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
				<Box
					sx={{
						// height: '100vh',
						marginLeft: widthDisplay ? 0 : themeLigthOrDark.spacing(28), // retira a margem da esqueda(sideBar)
						backgroundColor: themeLigthOrDark.palette.secondary.main,
					}}
				>
					{widthDisplay && (
						<button onClick={handlerSetDrawer}>
							<MenuIcon />
						</button>
					)}
					{children}
				</Box>
			</ThemeProvider>
		</>
	);
};
