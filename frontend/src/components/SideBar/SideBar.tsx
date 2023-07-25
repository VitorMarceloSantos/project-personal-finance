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
	useTheme,
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
// https://www.youtube.com/watch?v=o3B9KTlod4w&ab_channel=coder4life
export const SideBar: React.FC<ChildrenType> = ({ children }) => {
	const navigate = useNavigate();
	const theme = useTheme();

	const { register, handleSubmit } = useForm<UploadImage>({});

	const [file, setFile] = useState('');
	const newImage: File | string = !!file ? file : '../src/assets/print.png';

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
	return (
		<>
			{/* theme.spacing(28) -> 28 é um padrão de medida do materialUI */}
			<Drawer variant='permanent'>
				<Box
					sx={{
						width: theme.spacing(28),
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						backgroundColor: 'red',
					}}
				>
					<Box
						sx={{
							width: '100%',
							height: theme.spacing(28),
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: 'blue',
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
									border: '1px solid yellow',
									color: 'yellow',
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
										border: '1px solid yellow',
										borderRadius: '5px',
										textAlign: 'justify',
										// width: '50vw',
										// maxWidth: '550px',
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
									{ marginTop: '.5rem', borderColor: 'yellow', color: 'yellow', fontWeight: 'bold' },
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
					<Divider />
					<Box sx={{ flex: 1, backgroundColor: 'yellow' }}>
						<List>
							<ListItem disablePadding>
								<ListItemButton onClick={() => navigate('/')}>
									<ListItemIcon>
										<DashboardIcon />
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
			<Box sx={{ height: '100vh', marginLeft: theme.spacing(28) }}>{children}</Box>
		</>
	);
};
