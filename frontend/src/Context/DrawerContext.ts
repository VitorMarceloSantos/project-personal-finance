import { createContext } from 'react';
import { DrawerValueType } from '../Types/Drawer/DrawerTypes';

export const DrawerContext = createContext<DrawerValueType>({
	isDrawerOpen: false,
	handlerSetDrawer: () => [],
});
