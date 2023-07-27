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
} from '@mui/material';
import { ChildrenType } from '../../Types/ChildrenType';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { UploadImage } from '../../Types/UploadImage';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';
import { ThemeSideBar } from './ThemeSideBar';
// https://www.youtube.com/watch?v=o3B9KTlod4w&ab_channel=coder4life
export const SideBar: React.FC<ChildrenType> = ({ children }) => {
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm<UploadImage>({});
	const [file, setFile] = useState('');
	const newImage: File | string = !!file ? file : '../src/assets/userImg.jpg';

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

	const hoverSX = {
		'&:hover': {
			backgroundColor: 'white',
			color: 'black',
		},
	};

	return (
		<>
			<ThemeProvider theme={ThemeSideBar}>
				{/* theme.spacing(28) -> 28 é um padrão de medida do materialUI */}
				<Drawer variant='permanent'>
					<Box
						sx={{
							width: ThemeSideBar.spacing(28),
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							// backgroundColor: 'white',
						}}
					>
						<Box
							sx={{
								width: '100%',
								height: ThemeSideBar.spacing(28),
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: ThemeSideBar.palette.primary.main,
							}}
						>
							<Avatar src={newImage} sx={{ width: 80, height: 80 }} />
							<form onSubmit={handleSubmit(onSubmit)}>
								<Paper
									component='form'
									sx={{
										p: '1rem',
										display: 'flex',
										alignItems: 'center',
										flexDirection: 'column',
										background: 'transparent',
										// border: '1px solid yellow',
										// color: 'yellow',
										boxShadow: 'none',
									}}
								>
									<InputBase
										{...register('files')}
										sx={{
											m: 1,
											flex: 1,
											color: 'black',
											fontWeight: 'bold',
											fontFamily: 'Times New Roman',
											// border: '1px solid yellow',
											// borderRadius: '5px',
											textAlign: 'justify',
										}}
										placeholder='Imagem'
										type='file'
									/>
								</Paper>
								<Button
									type='submit'
									variant='outlined'
									startIcon={<CheckCircleIcon />}
									sx={[
										{
											marginTop: '.5rem',
											color: 'white',
											fontWeight: 'bold',
											backgroundColor: 'transparent',
											boxShadow: 'none',
										},
										{
											'&:hover': {
												color: 'black',
												backgroundColor: 'yellow',
												borderColor: 'black',
											},
										},
									]}
								>
									Confirmar
								</Button>
							</form>
						</Box>
						<Divider sx={{ backgroundColor: 'white' }} />
						<Box sx={{ flex: 1, backgroundColor: '#EF54C5' }}>
							<List>
								<ListItem disablePadding>
									<ListItemButton onClick={() => navigate('/')} sx={[hoverSX, { fontWeight: 'bold', color: 'white' }]}>
										<ListItemIcon>
											<DashboardIcon sx={{ color: 'white' }} />
										</ListItemIcon>
										<ListItemText primary='DashBoard' />
									</ListItemButton>
								</ListItem>

								<ListItem disablePadding>
									<ListItemButton onClick={() => navigate('/transacoes')}>
										<ListItemIcon>
											<CompareArrowsIcon />
										</ListItemIcon>
										<ListItemText primary='Transações' />
									</ListItemButton>
								</ListItem>

								<ListItem disablePadding>
									<ListItemButton onClick={() => navigate('/metas')}>
										<ListItemIcon>
											<AddTaskIcon />
										</ListItemIcon>
										<ListItemText primary='Metas' />
									</ListItemButton>
								</ListItem>

								<ListItem disablePadding>
									<ListItemButton onClick={() => navigate('/categorias')}>
										<ListItemIcon>
											<CategoryIcon />
										</ListItemIcon>
										<ListItemText primary='Categorias' />
									</ListItemButton>
								</ListItem>
							</List>
						</Box>
					</Box>
				</Drawer>
				<Box sx={{ height: '100vh', marginLeft: ThemeSideBar.spacing(28) }}>{children}</Box>
			</ThemeProvider>
		</>
	);
};
